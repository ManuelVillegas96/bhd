import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UiServiceService {

  constructor(private alertController: AlertController) { }

  async presentAlert( message: string) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: '',
      subHeader: '',
      message,
      buttons: ['OK']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    //console.log('onDidDismiss resolved with role', role);
  }
}
