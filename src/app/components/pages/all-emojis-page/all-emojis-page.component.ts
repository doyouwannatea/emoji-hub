import { Component } from '@angular/core';
import { EmojiStore } from 'src/app/services/EmojiStore/emoji.store';

@Component({
  selector: 'app-all-emojis-page',
  templateUrl: './all-emojis-page.component.html',
  styleUrls: ['./all-emojis-page.component.scss'],
})
export class AllEmojisPageComponent {
  constructor(public emojiStore: EmojiStore) {}
}
