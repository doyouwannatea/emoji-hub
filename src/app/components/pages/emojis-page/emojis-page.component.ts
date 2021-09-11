import { Component, Input } from '@angular/core';
import { EmojiList } from 'src/types/Emoji';

@Component({
  selector: 'app-emojis-page',
  templateUrl: './emojis-page.component.html',
  styleUrls: ['./emojis-page.component.scss'],
})
export class EmojisPageComponent {
  @Input() emojiList: EmojiList | null = [];
  @Input() loading: boolean | null = false;
  @Input() title = '';
}
