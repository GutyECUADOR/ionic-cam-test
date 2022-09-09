import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { UserData } from '../../providers/user-data';

import { MenuController } from '@ionic/angular';

import { UserOptions } from '../../interfaces/user-options';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  styleUrls: ['./login.scss'],
})
export class LoginPage {
  login: UserOptions = { email: '', password: '' };
  submitted = false;

  constructor(
    private authService: AuthService,
    public userData: UserData,
    public router: Router,
    public storage: Storage,
    public alertCtrl: AlertController,
    public menu: MenuController,
  ) { }

  async onLogin(form: NgForm) {
    this.submitted = true;
    
    if (form.valid) {
      this.authService.loginByEmail(this.login).subscribe( data => {
        console.log(data);
        if (data.access_token) {
          this.userData.login(data);
        this.router.navigateByUrl('/app/tabs/schedule');
        }
      }, async error =>{
        console.log(error);
        const alert = await this.alertCtrl.create({
          header: 'Login Fallido',
          message: `${error.error.message}`,
          buttons: ['OK'],
        });
        await alert.present();
      });
    }else{
      const alert = await this.alertCtrl.create({
        header: 'Login Fallido',
        message: `Complete los campos requeridos`,
        buttons: ['OK'],
      });
      await alert.present();
    }
  }

  onSignup() {
    this.router.navigateByUrl('/signup');
  }

  ionViewWillEnter() {
    this.storage.get('hasLoggedIn').then(res => {
      if (res === true) {
        this.router.navigateByUrl('/app/tabs/schedule', { replaceUrl: true });
      }
    });
  }

}
