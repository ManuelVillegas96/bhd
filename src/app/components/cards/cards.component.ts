import { Component, OnInit, Input } from '@angular/core';
import { Card } from 'src/app/interfaces/interfaces';
import {RouterModule} from '@angular/router';
import { ModalController } from '@ionic/angular';
import { PaymentPage } from '../../pages/payment/payment.page';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss', '../../app.component.scss'],
})
export class CardsComponent implements OnInit {

  @Input() cards : Card[] = [];
  skeletonSlide = {
    slidesPerView: 1,
    spaceBetween: 0.4,
    // Responsive breakpoints
    breakpoints: {
      // when window width is >= 320px
      320: {
        slidesPerView: 1.5,
        spaceBetween: 20,
      },
      // when window width is >= 480px
      480: {
        slidesPerView: 1.9,
        spaceBetween: 30,
      },
      // when window width is >= 640px
      640: {
        slidesPerView: 2.4,
        spaceBetween: 40,
      },
    }
  };

  constructor(private ModalController: ModalController) { }

  ngOnInit() {
    //console.log(this.cards);
  }

  async presentModal(card: Card, index: number) {
    const modal = await this.ModalController.create({
      component: CardComponent,
      componentProps: {
        card,
        index
      },
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }

}
