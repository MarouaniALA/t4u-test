import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import {SharedModule} from './shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NotFound404Component } from './components/not-found404/not-found404.component';

@NgModule({
  declarations: [
    AppComponent,
    NotFound404Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    SharedModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
