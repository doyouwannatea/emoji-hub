import { Component } from '@angular/core';
import { EmojiService } from 'src/app/services/EmojiService/emoji.service';
import { EmojiStore } from 'src/app/services/EmojiStore/emoji.store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'EmojiHub';

  constructor(
    private emojiService: EmojiService,
    private emojiStore: EmojiStore
  ) {
    emojiService.fetchEmojis().subscribe((data) => emojiStore.initEmojis(data));
  }
}
