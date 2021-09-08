import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from '../components/app/app.component';
import { EmojiListComponent } from '../components/emoji-list/emoji-list.component';
import { EmojiItemComponent } from '../components/emoji-item/emoji-item.component';
import { EmojiDetailsComponent } from '../components/emoji-details/emoji-details.component';

@NgModule({
  declarations: [
    AppComponent,
    EmojiListComponent,
    EmojiItemComponent,
    EmojiDetailsComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
