export interface EmojiItem {
  url: string;
  name: string;
}

export class Emoji implements EmojiItem {
  name: string;
  url: string;
  liked = false;
  deleted = false;

  constructor(emojiItem: EmojiItem) {
    this.name = emojiItem.name;
    this.url = emojiItem.url;
  }
}

export type EmojiMap = Record<string, string>;
export type EmojiList = Emoji[];

export const enum EmojiTabs {
  all = 'all',
  favorite = 'favorite',
  deleted = 'deleted',
}
