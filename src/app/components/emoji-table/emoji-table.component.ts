import { Component, Input } from '@angular/core';
import { EmojiService } from 'src/app/services/EmojiService/emoji.service';
import { EmojiStore } from 'src/app/services/EmojiStore/emoji.store';
import { EmojiList } from 'src/types/Emoji';

@Component({
  selector: 'app-emoji-table',
  templateUrl: './emoji-table.component.html',
  styleUrls: ['./emoji-table.component.scss'],
})
export class EmojiTableComponent {
  @Input() emojiList: EmojiList | null = null;
  constructor(
    public emojiService: EmojiService,
    public emojiStore: EmojiStore
  ) {}
}
