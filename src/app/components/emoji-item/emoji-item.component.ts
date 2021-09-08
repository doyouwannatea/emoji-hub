import { Component, OnInit, Input } from '@angular/core';
import { Emoji } from 'src/types/Emoji';

@Component({
  selector: 'app-emoji-item',
  templateUrl: './emoji-item.component.html',
  styleUrls: ['./emoji-item.component.scss'],
})
export class EmojiItemComponent implements OnInit {
  @Input() emoji?: Emoji;
  @Input() selected = false;
  ngOnInit(): void {}
}
