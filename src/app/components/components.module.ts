import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardsComponent } from './cards/cards.component';
import { CardComponent } from './card/card.component';
import { IonicModule } from '@ionic/angular';
import {RouterModule} from '@angular/router';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    CardsComponent,
    CardComponent
  ],
  exports: [
    CardsComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
    NgxMaskModule,
    FormsModule
  ]
})
export class ComponentsModule { }
