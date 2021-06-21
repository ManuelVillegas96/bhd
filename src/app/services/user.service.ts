import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';
import { NavController, ToastController } from '@ionic/angular';
import { UiServiceService } from './ui-service.service';

const api = environment.api;
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private token: string = null;
  private isAuthenticated = false;
  private authStatusListener = new Subject<boolean>();
  private error = new Subject();

  constructor(
    private http: HttpClient,
    private storage: Storage,
    private NavController: NavController,
    private UiService: UiServiceService,
    private ToastController: ToastController
  ) {
    this.storage.create();
  }

  login(username: string, password: string) {
    const data = { username, password };

    return new Promise((resolve) => {
      this.http.post(`${api}/login`, data).subscribe(
        (resp) => {
          this.saveToken(resp['token']);
          this.isAuthenticated = true;
          this.authStatusListener.next(true);
          this.NavController.navigateRoot('main/app/products', {
            animated: true,
          });
          resolve(true);
        },
        (error) => {
          this.token = null;
          this.storage.clear();
          if (error.error.message) {
            this.error.next([...error.error.message]);
          }
          this.isAuthenticated = true;
          this.UiService.presentAlert('Credenciales incorrectas');
          resolve(false);
        }
      );
    });
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.storage.clear();
    this.NavController.navigateRoot('/login', {
      animated: true,
    });
  }

  async saveToken(token: string) {
    this.token = token;
    await this.storage.set('token', token);
  }

  async getToken() {
    this.token = (await this.storage.get('token')) || null;
  }

  async returnToken() {
    this.getToken();
    return this.token;
  }

  getIsAuth() {
    this.getToken();
    if (this.token) {
      return (this.isAuthenticated = true);
    } else {
      return (this.isAuthenticated = false);
    }
  }

  getErrorListener() {
    return this.error.asObservable();
  }
}
