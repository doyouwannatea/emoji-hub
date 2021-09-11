import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmojiTabs } from 'src/types/Emoji';
import { AllEmojisPageComponent } from '../components/pages/all-emojis-page/all-emojis-page.component';
import { DeletedEmojisPageComponent } from '../components/pages/deleted-emojis-page/deleted-emojis-page.component';
import { FavoriteEmojisPageComponent } from '../components/pages/favorite-emojis-page/favorite-emojis-page.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'all',
    pathMatch: 'full',
  },
  {
    path: 'all',
    component: AllEmojisPageComponent,
    data: { emojiTab: EmojiTabs.all },
  },
  {
    path: 'favorite',
    component: FavoriteEmojisPageComponent,
    data: { emojiTab: EmojiTabs.favorite },
  },
  {
    path: 'deleted',
    component: DeletedEmojisPageComponent,
    data: { emojiTab: EmojiTabs.deleted },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
