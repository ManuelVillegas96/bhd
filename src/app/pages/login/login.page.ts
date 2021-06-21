import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Subscription } from 'rxjs';
import { NavController, MenuController } from '@ionic/angular';
import { UiServiceService } from '../../services/ui-service.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss', '../../app.component.scss'],
})
export class LoginPage implements OnInit {
  private error: string;
  private redirect_url = '';
  loginUser = {
    username: 'bhdleon',
    password: 'bhdleon',
  };
  serviceError: any;
  errorSub: Subscription;
  hide = true;

  constructor(
    private userService: UserService,
    private NavController: NavController,
    private UiService: UiServiceService,
    public route: ActivatedRoute,
    private MenuController: MenuController
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('error')) {
        this.error = paramMap.get('error');
      }
      if (paramMap.has('attempt_url')) {
        this.redirect_url = paramMap.get('attempt_url');
      }
    });
  }

  async login(fLogin: NgForm) {
    if (fLogin.invalid) {
      return;
    }

    this.userService.login(
      this.loginUser.username,
      this.loginUser.password
    );
  }

  menu() {
    this.MenuController.open();
  }
}
