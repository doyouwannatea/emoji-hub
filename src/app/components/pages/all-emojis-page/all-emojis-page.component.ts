import { Component } from '@angular/core';
import { EmojiService } from 'src/app/services/EmojiService/emoji.service';
import { EmojiStore } from 'src/app/services/EmojiStore/emoji.store';

@Component({
  selector: 'app-all-emojis-page',
  templateUrl: './all-emojis-page.component.html',
  styleUrls: ['./all-emojis-page.component.scss'],
})
export class AllEmojisPageComponent {
  constructor(
    public emojiService: EmojiService,
    public emojiStore: EmojiStore
  ) {}
}
