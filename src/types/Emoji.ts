export interface Emoji {
  url: string;
  name: string;
}

export type EmojiMap = Record<string, string>;
export type EmojiList = Emoji[];
