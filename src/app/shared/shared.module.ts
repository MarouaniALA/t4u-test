import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FooterComponent} from '../components/footer/footer.component';
import {MatIconModule} from '@angular/material/icon';



@NgModule({
  declarations: [FooterComponent],
  imports: [
    CommonModule,
    MatIconModule
  ],
  exports: [FooterComponent]
})
export class SharedModule { }
