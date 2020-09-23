import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserVideosComponent } from './user-videos.component';

const routes: Routes = [{ path: '', component: UserVideosComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserVideosRoutingModule { }
