import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { EmojiStore } from 'src/app/services/EmojiStore/emoji.store';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss'],
})
export class SearchInputComponent {
  searchString$: Observable<string>;

  constructor(private emojiStore: EmojiStore) {
    this.searchString$ = emojiStore.searchString$;
  }

  changeSearchHandler(value: string) {
    this.emojiStore.setSearchString(value);
  }

  clearSearch() {
    this.emojiStore.setSearchString('');
  }
}
