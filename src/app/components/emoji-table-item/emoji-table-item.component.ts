import { Component, Input } from '@angular/core';
import { Emoji } from 'src/types/Emoji';
import { EmojiStore } from '../../services/EmojiStore/emoji.store';

@Component({
  selector: 'app-emoji-table-item',
  templateUrl: './emoji-table-item.component.html',
  styleUrls: ['./emoji-table-item.component.scss'],
})
export class EmojiTableItemComponent {
  @Input() emoji: Emoji | null = null;
  constructor(public emojiStore: EmojiStore) {}
}
