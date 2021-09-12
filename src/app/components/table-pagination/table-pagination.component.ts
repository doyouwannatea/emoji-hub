import { Component } from '@angular/core';
import { EmojiStore } from 'src/app/services/EmojiStore/emoji.store';

@Component({
  selector: 'app-table-pagination',
  template: `
    <div class="text-end mt-3">
      <button
        (click)="emojiStore.increaseEmojisOnPage()"
        class="btn btn-secondary btn-sm"
      >
        show more
      </button>
    </div>
  `,
})
export class TablePaginationComponent {
  constructor(public emojiStore: EmojiStore) {}
}
