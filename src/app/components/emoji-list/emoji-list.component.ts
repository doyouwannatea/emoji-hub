import { Component, OnInit } from '@angular/core';
import { EmojiService } from 'src/app/services/EmojiService/emoji.service';
import { Emoji, EmojiList } from 'src/types/Emoji';

@Component({
  selector: 'app-emoji-list',
  templateUrl: './emoji-list.component.html',
  styleUrls: ['./emoji-list.component.scss'],
})
export class EmojiListComponent implements OnInit {
  selectedEmoji?: Emoji;
  emojiList?: EmojiList;

  constructor(private emojiService: EmojiService) {}

  ngOnInit(): void {
    this.emojiService
      .getEmojis()
      .subscribe((emojis) => (this.emojiList = emojis));

    this.emojiService.fetchEmojis().subscribe(console.log);
  }

  onSelect(emoji: Emoji): void {
    this.selectedEmoji = emoji;
  }
}
