import { Component } from '@angular/core';
import { UserData } from '../../providers/user-data';
import { PopoverController } from '@ionic/angular';

import { PopoverPage } from '../about-popover/about-popover';
import { IUser } from './../../interfaces/user.interface';

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
}
