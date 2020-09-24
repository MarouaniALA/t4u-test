import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {WatchVideosRoutingModule} from './watch-videos-routing.module';
import {WatchVideosComponent} from './watch-videos.component';
import {VgBufferingModule, VgControlsModule, VgCoreModule, VgOverlayPlayModule} from 'ngx-videogular';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import {SharedModule} from '../../shared/shared.module';


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
    MatIconModule,
    SharedModule,
  ]
})
export class WatchVideosModule {
}
