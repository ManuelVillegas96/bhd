import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss', '../../app.component.scss'],
})
export class PaymentPage implements OnInit {

  productNumber : string;
  clas : string;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    // console.log(this.route.snapshot.params['id']);
    // console.log(this.route.snapshot.params['class']);
  }

}
