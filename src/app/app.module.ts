import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AllEmojisPageComponent } from './components/pages/all-emojis-page/all-emojis-page.component';
import { AppComponent } from './components/app/app.component';
import { EmojiTableComponent } from './components/emoji-table/emoji-table.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { SearchInputComponent } from './components/search-input/search-input.component';
import { TablePaginationComponent } from './components/table-pagination/table-pagination.component';

import { AppRoutingModule } from './modules/app-routing.module';
import { EmojisPageComponent } from './components/pages/emojis-page/emojis-page.component';
import { FavoriteEmojisPageComponent } from './components/pages/favorite-emojis-page/favorite-emojis-page.component';
import { DeletedEmojisPageComponent } from './components/pages/deleted-emojis-page/deleted-emojis-page.component';
import { EmojiTableItemComponent } from './components/emoji-table-item/emoji-table-item.component';

@NgModule({
  declarations: [
    AppComponent,
    AllEmojisPageComponent,
    FooterComponent,
    SearchInputComponent,
    EmojiTableComponent,
    NavigationComponent,
    TablePaginationComponent,
    EmojisPageComponent,
    FavoriteEmojisPageComponent,
    DeletedEmojisPageComponent,
    EmojiTableItemComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
