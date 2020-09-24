import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {UserVideosRoutingModule} from './user-videos-routing.module';
import {UserVideosComponent} from './user-videos.component';
import {UploadTaskComponent} from './upload-task/upload-task.component';

import {MatTabsModule} from '@angular/material/tabs';
import {NgxDropzoneModule} from 'ngx-dropzone';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {VgBufferingModule, VgControlsModule, VgCoreModule, VgOverlayPlayModule} from 'ngx-videogular';
import {SharedModule} from '../../shared/shared.module';
import {MatInputModule} from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [UserVideosComponent, UploadTaskComponent],
  imports: [
    CommonModule,
    UserVideosRoutingModule,
    MatTabsModule,
    NgxDropzoneModule,
    MatProgressBarModule,
    MatGridListModule,
    MatButtonModule,
    MatIconModule,
    VgCoreModule,
    VgControlsModule, VgOverlayPlayModule, VgBufferingModule,
    SharedModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class UserVideosModule {
}
