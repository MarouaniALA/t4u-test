import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {WatchVideosRoutingModule} from './watch-videos-routing.module';
import {WatchVideosComponent} from './watch-videos.component';
import {VgBufferingModule, VgControlsModule, VgCoreModule, VgOverlayPlayModule} from 'ngx-videogular';
import {MatGridListModule} from '@angular/material/grid-list';


@NgModule({
  declarations: [WatchVideosComponent],
  imports: [
    CommonModule,
    WatchVideosRoutingModule,
    VgBufferingModule,
    VgControlsModule,
    VgCoreModule,
    VgOverlayPlayModule,
    MatGridListModule,

  ]
})
export class WatchVideosModule {
}
