import { EmojiMap, EmojiList, EmojiItem } from '../../types/Emoji';

export function emojiMapToList(emojiMap: EmojiMap): EmojiItem[] {
  return Object.entries(emojiMap).map(([key, value]) => ({
    name: key,
    url: value,
  }));
}
