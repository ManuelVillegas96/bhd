import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { Card, Transaction } from 'src/app/interfaces/interfaces';
import { CardsService } from '../../services/cards.service';
import {RouterModule} from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss', '../../app.component.scss'],
})
export class Tab1Page implements OnInit {
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
    },
  };
  isloading = false;
  cards: Card[] = [];
  transactions: Transaction[] = [];
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  constructor(private CardsService: CardsService) {
    /* get cards */
    this.CardsService.getCards();
    this.CardsService.getCardsUpdatedListener().subscribe((cardsFetched) => {
      this.cards = cardsFetched;
      //console.log(this.cards);
      //
      for (var icard of this.cards) {
        this.load_transactions(icard.productNumber);
      }
      //stop loading
      this.isloading = true;
    });
  }

  ngOnInit() {
    
  }

  load_transactions(productNumber: string) {
    /* get transactions */

    this.CardsService.getTransactions(productNumber);
    this.CardsService.getTransactionsUpdatedListener().subscribe(
      (transactionsFetched) => {
        this.transactions.push( ...transactionsFetched );
      }
    );
  }
}
