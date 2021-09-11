import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BehaviorSubjectItem } from 'src/app/helpers/BehaviorSubjectItem';
import { EmojiList, Emoji } from 'src/types/Emoji';

// [x] TODO при нажатии на [*] эмоджи добавляется в список любимых и меняет иконку на более яркую
// [ ] при обновлении страницы состояние списков должно сохранятся
// [ ] при наведении на превью эмоджи должна всплывать полноразмераная картинка
// [ ] рефакторинг стилей и кода

interface EmojiState {
  quantity: number;
  page: number;
  searchString: string;
  emojis: {
    initial: EmojiList;
    all: EmojiList;
    favorite: EmojiList;
    deleted: EmojiList;
  };
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
    this.state.value = {
      ...oldData,
      emojis: {
        initial: data,
        all: [...data],
        deleted: [],
        favorite: [],
      },
    };
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
    likedEmoji.like();
    this.state.value.emojis.favorite.push(likedEmoji);
  }

  unlikeEmoji(unlikedEmoji: Emoji): void {
    const { favorite: favoriteEmojis } = this.state.value.emojis;
    unlikedEmoji.unlike();
    this.setFavoriteEmojis(
      favoriteEmojis.filter((emoji) => unlikedEmoji !== emoji)
    );
  }

  deleteEmoji(deletedEmoji: Emoji): void {
    const { all: allEmojis } = this.state.value.emojis;

    deletedEmoji.delete();
    this.state.value.emojis.deleted.push(deletedEmoji);
    this.setAllEmojis(allEmojis.filter((emoji) => deletedEmoji !== emoji));
  }

  restoreEmoji(restoredEmoji: Emoji): void {
    const { deleted: deletedEmojis } = this.state.value.emojis;

    restoredEmoji.restore();
    this.state.value.emojis.all.push(restoredEmoji);
    this.setDeletedEmojis(
      deletedEmojis.filter((emoji) => restoredEmoji !== emoji)
    );
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
