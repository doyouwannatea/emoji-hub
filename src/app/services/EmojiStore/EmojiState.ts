import { EmojiList } from 'src/types/Emoji';

export interface Emojis {
  initial: EmojiList;
  all: EmojiList;
  favorite: EmojiList;
  deleted: EmojiList;
}

export interface IEmojiState {
  disablePagination: boolean;
  quantity: number;
  page: number;
  searchString: string;
  emojis: Emojis;
}

export class EmojiState implements IEmojiState {
  disablePagination = false;
  page = 1;
  quantity = 5;
  searchString = '';
  emojis: Emojis = {
    initial: [],
    all: [],
    deleted: [],
    favorite: [],
  };

  constructor(oldState?: IEmojiState) {
    if (oldState) {
      this.disablePagination = oldState.disablePagination;
      this.page = oldState.page;
      this.quantity = oldState.quantity;
      this.searchString = oldState.searchString;
      this.emojis = oldState.emojis;
    }
  }

  setEmojis(data: Emojis): this {
    this.emojis = data;
    return this;
  }

  setInitialEmojis(data: EmojiList): this {
    this.emojis.initial = data;
    return this;
  }

  setAllEmojis(data: EmojiList): this {
    this.emojis.all = data;
    return this;
  }

  setFavoriteEmojis(data: EmojiList): this {
    this.emojis.favorite = data;
    return this;
  }

  setDeletedEmojis(data: EmojiList): this {
    this.emojis.deleted = data;
    return this;
  }

  setSearchString(data: string): this {
    this.searchString = data;
    return this;
  }

  increaseEmojisOnPage(): this {
    const INCREASE_ON = 5;
    this.quantity += INCREASE_ON;
    return this;
  }
}
