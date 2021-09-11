import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BehaviorSubjectItem } from 'src/app/helpers/BehaviorSubjectItem';
import { EmojiList, Emoji } from 'src/types/Emoji';
import { EmojiService } from '../EmojiService/emoji.service';

// [x] TODO при нажатии на [*] эмоджи добавляется в список любимых и меняет иконку на более яркую
// [x] при обновлении страницы состояние списков должно сохранятся
// [x] при наведении на превью эмоджи должна всплывать полноразмераная картинка
// [ ] рефакторинг стилей и кода

export interface Emojis {
  initial: EmojiList;
  all: EmojiList;
  favorite: EmojiList;
  deleted: EmojiList;
}

export interface EmojiState {
  quantity: number;
  page: number;
  searchString: string;
  emojis: Emojis;
}

const EMOJI_INITIAL_STATE: EmojiState = {
  page: 1,
  quantity: 5,
  searchString: '',
  emojis: {
    initial: [],
    all: [],
    deleted: [],
    favorite: [],
  },
};

@Injectable({
  providedIn: 'root',
})
export class EmojiStore {
  private state = new BehaviorSubjectItem<EmojiState>(EMOJI_INITIAL_STATE);

  constructor(private emojiService: EmojiService) {}

  allEmojis$: Observable<EmojiList> = this.state.value$.pipe(
    map((state) => state.emojis.all),
    map(this.search()),
    map(this.sort()),
    map(this.paginate())
  );

  favoriteEmojis$: Observable<EmojiList> = this.state.value$.pipe(
    map((state) => state.emojis.favorite),
    map(this.search()),
    map(this.sort()),
    map(this.paginate())
  );

  deletedEmojis$: Observable<EmojiList> = this.state.value$.pipe(
    map((state) => state.emojis.deleted),
    map(this.search()),
    map(this.sort()),
    map(this.paginate())
  );

  searchString$: Observable<string> = this.state.value$.pipe(
    map((state) => state.searchString.trim())
  );

  initEmojis(data: EmojiList): void {
    const oldData = this.state.value;
    const emojisFromLocalStorage =
      this.emojiService.getEmojisFromLocalStorage();

    if (
      emojisFromLocalStorage &&
      data.length === emojisFromLocalStorage.initial.length &&
      data.every((emoji) =>
        emojisFromLocalStorage.initial.find((item) => item.name === emoji.name)
      )
    ) {
      this.state.value = {
        ...oldData,
        emojis: emojisFromLocalStorage,
      };
      return;
    }

    this.state.value = {
      ...oldData,
      emojis: {
        initial: data,
        all: [...data],
        deleted: [],
        favorite: [],
      },
    };

    this.emojiService.saveEmojisToLocalStorage(this.state.value.emojis);
  }

  setAllEmojis(data: EmojiList): void {
    const oldData = this.state.value;
    this.state.value = {
      ...oldData,
      emojis: {
        ...oldData.emojis,
        all: data,
      },
    };
  }

  setFavoriteEmojis(data: EmojiList): void {
    const oldData = this.state.value;
    this.state.value = {
      ...oldData,
      emojis: {
        ...oldData.emojis,
        favorite: data,
      },
    };
  }

  setDeletedEmojis(data: EmojiList): void {
    const oldData = this.state.value;
    this.state.value = {
      ...oldData,
      emojis: {
        ...oldData.emojis,
        deleted: data,
      },
    };
  }

  setSearchString(data: string): void {
    const oldData = this.state.value;
    this.state.value = {
      ...oldData,
      searchString: data,
    };
  }

  increaseEmojisOnPage() {
    const INCREASE_AMOUNT = 5;
    const oldData = this.state.value;
    this.state.value = {
      ...oldData,
      quantity: oldData.quantity + INCREASE_AMOUNT,
    };
  }

  likeEmoji(likedEmoji: Emoji): void {
    likedEmoji.liked = true;
    this.state.value.emojis.favorite.push(likedEmoji);
    this.emojiService.saveEmojisToLocalStorage(this.state.value.emojis);
  }

  unlikeEmoji(unlikedEmoji: Emoji): void {
    const { favorite: favoriteEmojis, all: allEmojis } =
      this.state.value.emojis;
    this.setFavoriteEmojis(
      favoriteEmojis.filter((emoji) => unlikedEmoji.name !== emoji.name)
    );
    const emoji = allEmojis.find((emoji) => unlikedEmoji.name === emoji.name);
    if (emoji) emoji.liked = false;
    this.emojiService.saveEmojisToLocalStorage(this.state.value.emojis);
  }

  deleteEmoji(deletedEmoji: Emoji): void {
    const { all: allEmojis } = this.state.value.emojis;

    deletedEmoji.deleted = true;
    this.state.value.emojis.deleted.push(deletedEmoji);
    this.setAllEmojis(
      allEmojis.filter((emoji) => deletedEmoji.name !== emoji.name)
    );
    this.emojiService.saveEmojisToLocalStorage(this.state.value.emojis);
  }

  restoreEmoji(restoredEmoji: Emoji): void {
    const { deleted: deletedEmojis } = this.state.value.emojis;

    restoredEmoji.deleted = false;
    this.state.value.emojis.all.push(restoredEmoji);
    this.setDeletedEmojis(
      deletedEmojis.filter((emoji) => restoredEmoji.name !== emoji.name)
    );
    this.emojiService.saveEmojisToLocalStorage(this.state.value.emojis);
  }

  paginate(): (emojiList: EmojiList) => EmojiList {
    return (emojiList) => {
      const { page, quantity } = this.state.value;
      return emojiList.slice((page - 1) * quantity, page * quantity);
    };
  }

  search(): (emojiList: EmojiList) => EmojiList {
    return (emojiList) => {
      const searchString = this.state.value.searchString.toLowerCase().trim();
      if (!searchString) return emojiList;

      return emojiList.filter((emoji) =>
        emoji.name.toLowerCase().trim().includes(searchString)
      );
    };
  }

  sort(): (emojiList: EmojiList) => EmojiList {
    return (emojiList) =>
      emojiList.sort((a, b) => a.name.localeCompare(b.name));
  }
}
