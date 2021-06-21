import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Card, Transaction } from '../interfaces/interfaces';
import { Subject, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { UiServiceService } from './ui-service.service';

const api = environment.api;

@Injectable({
  providedIn: 'root',
})
export class CardsService {
  private cardsMulti: Card[] = [];
  private cardsUpdated = new Subject<Card[]>();
  private transactionsMulti: Transaction[] = [];
  private transactionsUpdated = new Subject<Transaction[]>();
  private error = new Subject();

  constructor(private http: HttpClient, private UiService: UiServiceService) {}

  getCards() {
    return this.http
      .get<any>(`${api}/cards`)
      .pipe(
        map((requestData) => {
          return requestData.map((card) => {
            return {
              productNumber: card.productNumber,
              productBrand: card.productBrand,
              LimitRD: card.LimitRD,
              BalanceRD: card.BalanceRD,
              LimitUS: card.LimitUS,
              BalanceUS: card.BalanceUS,
              clientName: card.clientName,
              productEndingDate: card.productEndingDate,
            };
          });
        })
      )
      .subscribe((transformedCard) => {
        this.cardsMulti = transformedCard;
        this.cardsUpdated.next([...this.cardsMulti]);
      });
  }

  getCardsUpdatedListener() {
    return this.cardsUpdated.asObservable();
  }

  getTransactions(cardNumber: string) {
    return this.http
    .get<any>(`${api}/cards/movements/${cardNumber}`)
    .pipe(
      map((requestData) => {
        return requestData.map((transaction) => {
          return {
            productNumber:   transaction.productNumber,
            amount:          transaction.amount,
            description:     transaction.description,
            transactionType: transaction.transactionType,
            date:            transaction.date,
          };
        });
      })
    )
    .subscribe((transformedTransaction) => {
      this.transactionsMulti = transformedTransaction;
      this.transactionsUpdated.next([...this.transactionsMulti]);
    });
  }

  getTransactionsUpdatedListener() {
    return this.transactionsUpdated.asObservable();
  }

  pay(productNumber: string, amount: number) {
    const data = { productNumber, amount };

    return new Promise((resolve) => {
      this.http.post(`${api}/cards/payment`, data).subscribe(
        (resp) => {
          resolve(true);
        },
        (error) => {
          if (error.error.message) {
            this.error.next([...error.error.message]);
          }
          this.UiService.presentAlert('Error en pago de tarjeta');
          resolve(false);
        }
      );
    });
  }
}
