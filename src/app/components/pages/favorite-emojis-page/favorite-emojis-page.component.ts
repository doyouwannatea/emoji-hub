import { Component } from '@angular/core';
import { EmojiStore } from 'src/app/services/EmojiStore/emoji.store';

@Component({
  selector: 'app-favorite-emojis-page',
  template: `
    <app-emojis-page
      [title]="'Любимые'"
      [emojiList]="emojiStore.favoriteEmojis$ | async"
    ></app-emojis-page>
  `,
})
export class FavoriteEmojisPageComponent {
  constructor(public emojiStore: EmojiStore) {}
}
