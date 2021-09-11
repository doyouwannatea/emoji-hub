import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, catchError, delay } from 'rxjs/operators';
import { BehaviorSubjectItem } from 'src/app/helpers/BehaviorSubjectItem';
import { emojiMapToList } from 'src/app/helpers/emojiMapToList';
import { mockEmojiMap } from 'src/app/mocks/mock-emoji-map';
import { environment } from 'src/environments/environment';
import { Emoji, EmojiList, EmojiMap } from 'src/types/Emoji';

@Injectable({
  providedIn: 'root',
})
export class EmojiService {
  private emojisUrl = 'https://api.github.com/emojis';
  loading = new BehaviorSubjectItem(false);

  constructor(private http: HttpClient) {
    this.fetchEmojis();
  }

  fetchEmojis(): Observable<EmojiList> {
    this.loading.value = true;
    let result$: Observable<EmojiList>;

    if (environment.mockEmojis) {
      result$ = of(mockEmojiMap).pipe(
        delay(1000),
        catchError(this.handleError<EmojiMap>('fetchEmojis', {})),
        map(emojiMapToList),
        map((emojiList) => emojiList.map((emoji) => new Emoji(emoji)))
      );
    } else {
      result$ = this.http.get<EmojiMap>(this.emojisUrl).pipe(
        catchError(this.handleError<EmojiMap>('fetchEmojis', {})),
        map(emojiMapToList),
        map((emojiList) => emojiList.map((emoji) => new Emoji(emoji)))
      );
    }

    result$.subscribe(() => (this.loading.value = false));
    return result$;
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
