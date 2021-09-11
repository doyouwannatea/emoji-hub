import { Component } from '@angular/core';
import { EmojiService } from 'src/app/services/EmojiService/emoji.service';
import { EmojiStore } from 'src/app/services/EmojiStore/emoji.store';

@Component({
  selector: 'app-favorite-emojis-page',
  templateUrl: './favorite-emojis-page.component.html',
  styleUrls: ['./favorite-emojis-page.component.scss'],
})
export class FavoriteEmojisPageComponent {
  constructor(
    public emojiService: EmojiService,
    public emojiStore: EmojiStore
  ) {}
}
