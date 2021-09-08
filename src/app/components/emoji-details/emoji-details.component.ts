import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Emoji } from 'src/types/Emoji';
import { EmojiService } from '../../services/EmojiService/emoji.service';

@Component({
  selector: 'app-emoji-details',
  templateUrl: './emoji-details.component.html',
  styleUrls: ['./emoji-details.component.scss'],
})
export class EmojiDetailsComponent implements OnInit {
  emoji?: Emoji;
  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private emojiService: EmojiService
  ) {}
  ngOnInit(): void {
    const name = this.route.snapshot.paramMap.get('name');
    this.emojiService
      .getSelectedEmoji(name)
      .subscribe((emoji) => (this.emoji = emoji));
  }
}
