import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AuthGuard} from './guards/auth.guard';
import {NotAuthGuard} from './guards/not-auth.guard';
import {NotFound404Component} from './components/not-found404/not-found404.component';

const routes: Routes = [
  {
    path: '', redirectTo: '/userVideos', pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./auth/login/login.module').then(m => m.LoginModule),
    canActivate: [NotAuthGuard]
  },
  {
    path: 'userVideos', loadChildren: () => import('./components/user-videos/user-videos.module')
      .then(m => m.UserVideosModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'watchVideos/:fileId', loadChildren: () =>
      import('./components/watch-videos/watch-videos.module').then(m => m.WatchVideosModule),
    canActivate: [AuthGuard]
  },
  {path: '404', component: NotFound404Component},
  {path: '**', redirectTo: '/404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
