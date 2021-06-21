import { Component, OnInit } from '@angular/core';
import { CardsService } from '../../services/cards.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss', '../../app.component.scss']
})
export class Tab2Page implements OnInit{

  constructor(private CardsService: CardsService) {}

  ngOnInit() {
    // this.CardsService.getCardsMovements('4556180834548869').subscribe((resp) => {
    //   console.log(resp);
    // });
  }

}
