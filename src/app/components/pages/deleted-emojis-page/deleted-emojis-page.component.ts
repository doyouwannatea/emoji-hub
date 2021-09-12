import { Component } from '@angular/core';
import { EmojiStore } from 'src/app/services/EmojiStore/emoji.store';

@Component({
  selector: 'app-deleted-emojis-page',
  template: `
    <app-emojis-page
      [title]="'Удалённые'"
      [emojiList]="emojiStore.deletedEmojis$ | async"
    >
    </app-emojis-page>
  `,
})
export class DeletedEmojisPageComponent {
  constructor(public emojiStore: EmojiStore) {}
}
