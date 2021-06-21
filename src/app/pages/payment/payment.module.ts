import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaymentPageRoutingModule } from './payment-routing.module';

import { PaymentPage } from './payment.page';
import { MaterialModule } from '../../material.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PaymentPageRoutingModule,
    MaterialModule
  ],
  declarations: [PaymentPage]
})
export class PaymentPageModule {}
