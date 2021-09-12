import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BehaviorSubjectItem } from 'src/app/helpers/BehaviorSubjectItem';
import { EmojiList, Emoji } from 'src/types/Emoji';
import { EmojiService } from '../EmojiService/emoji.service';
import { EmojiState, IEmojiState } from './EmojiState';

@Injectable({
  providedIn: 'root',
})
export class EmojiStore {
  private state = new BehaviorSubjectItem<IEmojiState>(new EmojiState());
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

  disablePagination$: Observable<boolean> = this.state.value$.pipe(
    map((state) => state.disablePagination)
  );

  initEmojis(data: EmojiList): void {
    const oldData = this.state.value;
    const newState = new EmojiState(oldData)
      .setInitialEmojis(data)
      .setAllEmojis(data);
    const emojisFromLocalStorage =
      this.emojiService.getEmojisFromLocalStorage();

    if (
      emojisFromLocalStorage &&
      data.length === emojisFromLocalStorage.initial.length &&
      data.every((emoji) =>
        emojisFromLocalStorage.initial.find((item) => item.name === emoji.name)
      )
    ) {
      newState.setEmojis(emojisFromLocalStorage);
    }

    this.state.value = newState;
    this.emojiService.saveEmojisToLocalStorage(this.state.value.emojis);
  }

  setAllEmojis(data: EmojiList): void {
    const oldData = this.state.value;
    this.state.value = new EmojiState(oldData).setAllEmojis(data);
  }

  setFavoriteEmojis(data: EmojiList): void {
    const oldData = this.state.value;
    this.state.value = new EmojiState(oldData).setFavoriteEmojis(data);
  }

  setDeletedEmojis(data: EmojiList): void {
    const oldData = this.state.value;
    this.state.value = new EmojiState(oldData).setDeletedEmojis(data);
  }

  setSearchString(data: string): void {
    const oldData = this.state.value;
    this.state.value = new EmojiState(oldData).setSearchString(data);
  }

  increaseEmojisOnPage() {
    const oldData = this.state.value;
    this.state.value = new EmojiState(oldData).increaseEmojisOnPage();
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

      this.state.value.disablePagination = emojiList.length <= page * quantity;
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
