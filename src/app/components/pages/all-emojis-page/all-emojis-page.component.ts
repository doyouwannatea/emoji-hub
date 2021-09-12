import { Component } from '@angular/core';
import { EmojiStore } from 'src/app/services/EmojiStore/emoji.store';

@Component({
  selector: 'app-all-emojis-page',
  template: `
    <app-emojis-page
      [title]="'Все'"
      [emojiList]="emojiStore.allEmojis$ | async"
    ></app-emojis-page>
  `,
})
export class AllEmojisPageComponent {
  constructor(public emojiStore: EmojiStore) {}
}
