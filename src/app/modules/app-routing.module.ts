import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmojiDetailsComponent } from '../components/emoji-details/emoji-details.component';
import { EmojiListComponent } from '../components/emoji-list/emoji-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'list', component: EmojiListComponent, pathMatch: 'full' },
  { path: 'details/:name', component: EmojiDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
