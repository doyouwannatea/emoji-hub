import { EmojiMap, EmojiList } from '../../types/Emoji';

export function emojiMapToList(emojiMap: EmojiMap): EmojiList {
  return Object.entries(emojiMap).map(([key, value]) => ({
    name: key,
    url: value,
  }));
}
