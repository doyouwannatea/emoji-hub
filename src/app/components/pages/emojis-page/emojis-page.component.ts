import { Component, Input } from '@angular/core';
import { EmojiService } from 'src/app/services/EmojiService/emoji.service';
import { EmojiList } from 'src/types/Emoji';

@Component({
  selector: 'app-emojis-page',
  templateUrl: './emojis-page.component.html',
})
export class EmojisPageComponent {
  @Input() emojiList: EmojiList | null = [];
  @Input() title = '';

  constructor(public emojiService: EmojiService) {}
}
