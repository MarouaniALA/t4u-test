import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WatchVideosRoutingModule } from './watch-videos-routing.module';
import { WatchVideosComponent } from './watch-videos.component';


@NgModule({
  declarations: [WatchVideosComponent],
  imports: [
    CommonModule,
    WatchVideosRoutingModule
  ]
})
export class WatchVideosModule { }
