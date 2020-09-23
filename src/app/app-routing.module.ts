import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

const routes: Routes = [
  {
    path: '', redirectTo: '/login', pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./auth/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'userVideos', loadChildren: () => import('./components/user-videos/user-videos.module').then(m => m.UserVideosModule)
  },
  {
    path: 'watchVideos/:fileId', loadChildren: () =>
      import('./components/watch-videos/watch-videos.module').then(m => m.WatchVideosModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
