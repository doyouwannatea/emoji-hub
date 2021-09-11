import { Component } from '@angular/core';
import { EmojiStore } from 'src/app/services/EmojiStore/emoji.store';

@Component({
  selector: 'app-favorite-emojis-page',
  templateUrl: './favorite-emojis-page.component.html',
  styleUrls: ['./favorite-emojis-page.component.scss'],
})
export class FavoriteEmojisPageComponent {
  constructor(public emojiStore: EmojiStore) {}
}
