import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WatchVideosComponent } from './watch-videos.component';

const routes: Routes = [{ path: '', component: WatchVideosComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WatchVideosRoutingModule { }
