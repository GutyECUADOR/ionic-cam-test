import { Component, ViewChild } from '@angular/core';
import { UserData } from '../../providers/user-data';
import { AlertController, PopoverController } from '@ionic/angular';

import { PopoverPage } from '../about-popover/about-popover';
import { IUser } from './../../interfaces/user.interface';
import { environment } from '../../../environments/environment';

import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { InversionService } from 'src/app/services/inversion.service';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
  styleUrls: ['./about.scss'],
})
export class AboutPage {
  foto: string;
  user: IUser;
  token:string;
  exchangeLabels:string[];
  exchangeValues:any[];

  constructor(
              public popoverCtrl: PopoverController,  
              public userData: UserData,
              public inversionService: InversionService,
              public alertCtrl: AlertController,
              ) {
    userData.getUser().then( data => {
      this.user = data.user;
    });

    userData.getToken().then( token => {
      this.token = token;
    });

    
   }

  async ngOnInit() {
    
  }

  async presentPopover(event: Event) {
    const popover = await this.popoverCtrl.create({
      component: PopoverPage,
      event
    });
    await popover.present();
  }

  openSocial(){
    let phone = environment.phone;
    console.log('Open Whatsapp');
    window.open(`https://api.whatsapp.com/send?phone=${phone}&text=Necesito soporte sobre..."`, "_blank");
  }

  async cargarFoto() {
    const avatar = await Camera.getPhoto({
      resultType: CameraResultType.Base64,
      source: CameraSource.Photos,
      quality: 100
    })

    if (avatar) {
      console.log(avatar.base64String);
      this.foto = avatar.base64String;
      this.updateFoto();
    }
    
  }

  async updateFoto() {
    if (this.foto) {
      this.inversionService.postUpdateAvatar(this.foto).subscribe( async data => {
        console.log(data);
        const alert = await this.alertCtrl.create({
          header: 'Actualización de Avatar',
          message: `${data.message}. Reinicia sesión para cargar tu nuevo avatar.`,
          buttons: ['Aceptar']
        });
        await alert.present();
      }, async error =>{
        console.log(error);
        console.log(error.error.errors);
        let erroresString = '';
        Object.values(error.error.errors).forEach(error => {
          console.log(error[0]);
          erroresString += '<br>' + error[0];
        });
        const alert = await this.alertCtrl.create({
          header: 'Registro Fallido',
          message: `No se completo. ${erroresString}. `,
          buttons: ['Aceptar'],
        });
        await alert.present();
      });
    }
  }

  getAvatar() {
    let URL_avatars = environment.URL_avatars;
    return `${URL_avatars}${this.user?.avatar}`;

  }
}
