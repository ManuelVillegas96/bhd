import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss', '../../app.component.scss']
})
export class Tab3Page {

  constructor( private UserService: UserService) {}

  logout() {
    this.UserService.logout();
  }
}
