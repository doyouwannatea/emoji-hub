import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { emojiMapToList } from 'src/app/helpers/emojiMapToList';
import { mockEmojiMap } from 'src/app/mocks/mock-emoji-map';
import { Emoji, EmojiList, EmojiMap } from 'src/types/Emoji';

@Injectable({
  providedIn: 'root',
})
export class EmojiService {
  private emojisUrl = 'https://api.github.com/emojis';

  constructor(private http: HttpClient) {}

  fetchEmojis(): Observable<EmojiList> {
    return this.http
      .get<EmojiMap>(this.emojisUrl)
      .pipe(
        catchError(this.handleError<EmojiMap>('fetchEmojis', {})),
        map(emojiMapToList)
      );
  }

  getEmojis(): Observable<EmojiList> {
    const emojis = of(emojiMapToList(mockEmojiMap));
    return emojis;
  }

  getSelectedEmoji(name: string | null): Observable<Emoji | undefined> {
    const emojis = emojiMapToList(mockEmojiMap);
    const foundEmoji = of(emojis.find((emoji) => emoji.name === name));
    return foundEmoji;
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
