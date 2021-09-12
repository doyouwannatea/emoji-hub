import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmojiTabs } from 'src/types/Emoji';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent {
  activeTab: string = EmojiTabs.all;

  constructor(private activatedRoute: ActivatedRoute) {
    this.activatedRoute.data.subscribe(
      (data) => (this.activeTab = data.emojiTab)
    );
  }
}
