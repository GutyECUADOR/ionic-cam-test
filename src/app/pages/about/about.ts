import { Component } from '@angular/core';
import { UserData } from '../../providers/user-data';
import { PopoverController } from '@ionic/angular';

import { PopoverPage } from '../about-popover/about-popover';
import { IUser } from './../../interfaces/user.interface';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
  styleUrls: ['./about.scss'],
})
export class AboutPage {
  location = 'madison';
  user: IUser;
  token:string;

  constructor(public popoverCtrl: PopoverController,  public userData: UserData) {
    userData.getUser().then( data => {
      this.user = data.user;
    });

    userData.getToken().then( token => {
      this.token = token;
    });
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
}
