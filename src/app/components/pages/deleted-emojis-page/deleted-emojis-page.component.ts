import { Component } from '@angular/core';
import { EmojiService } from 'src/app/services/EmojiService/emoji.service';
import { EmojiStore } from 'src/app/services/EmojiStore/emoji.store';

@Component({
  selector: 'app-deleted-emojis-page',
  templateUrl: './deleted-emojis-page.component.html',
  styleUrls: ['./deleted-emojis-page.component.scss'],
})
export class DeletedEmojisPageComponent {
  constructor(
    public emojiService: EmojiService,
    public emojiStore: EmojiStore
  ) {}
}
