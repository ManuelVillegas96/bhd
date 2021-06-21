import { Component, OnInit, Input } from '@angular/core';
import { Card } from 'src/app/interfaces/interfaces';
import { ModalController, AlertController } from '@ionic/angular';
import { CardsService } from '../../services/cards.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss', '../../app.component.scss'],
})
export class CardComponent implements OnInit {
  type: string;
  xrd: number;
  xus: number;
  loading = false;
  @Input() card: Card;
  @Input() index: number;

  constructor(
    private CardsService: CardsService,
    private ModalController: ModalController,
    private AlertController: AlertController
  ) {}

  ngOnInit() {
    this.xrd = this.card.LimitRD / this.card.BalanceRD / 100;
    this.xus = this.card.LimitRD / this.card.BalanceRD / 100;
    this.type = 'rd';
  }

  dismiss() {
    this.ModalController.dismiss();
  }

  segmentChanged(ev: any) {
    //console.log('Segment changed', ev);
  }

  payment() {
    this.loading = true;
    this.CardsService.pay(this.card.productNumber, 500);
    this.presentAlert();
  }

  async presentAlert() {
    const alert = await this.AlertController.create({
      mode: 'md',
      backdropDismiss: false,
      cssClass: 'pay-alert',
      message: '<ion-row lines="none" class="ion-no-border ion-justify-content-center"><ion-label lines="none" class="ion-text-center ion-no-border"><ion-icon slot="icon-only" name="checkmark-outline" color="success" class="succes-icon" size="large"></ion-icon><h3 class="primary-color ion-text-center">Pago exitoso</h3><p class="ion-text-center ion-text-wrap">El pago de tu tarjeta de crédito ha realizado con exito</p></ion-label></ion-row>',
      buttons: [
        {
          text: 'Cerrar',
          cssClass: 'outline-alert-dismiss',
          handler: () => {
            this.loading = false;
          }
        }
      ]
    });

    await alert.present();
  }
}
