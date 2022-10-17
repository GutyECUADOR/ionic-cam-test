import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserData } from '../../providers/user-data';

import { MenuController } from '@ionic/angular';
import { Preferences } from '@capacitor/preferences';

import { UserOptions } from '../../interfaces/user-options';
import { AlertController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';

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
    public alertCtrl: AlertController,
    public menu: MenuController,
    private loadingCtrl: LoadingController
  ) { }

  async onLogin(form: NgForm) {
    const loading = await this.loadingCtrl.create({
      message: 'Validando ingreso, espere...',
    });
    loading.present();


    this.submitted = true;
    
    if (form.valid) {
      this.authService.loginByEmail(this.login).subscribe( data => {
        console.log(data);
        if (data.access_token) {
          this.userData.login(data);
          loading.dismiss();
        this.router.navigateByUrl('/app/tabs/schedule');
        }
      }, async error =>{
        console.log(error);
        const alert = await this.alertCtrl.create({
          header: 'Login Fallido',
          message: `${error.error.message}`,
          buttons: ['OK'],
        });
        loading.dismiss();
        await alert.present();
      });
    }else{
      const alert = await this.alertCtrl.create({
        header: 'Login Fallido',
        message: `Complete los campos requeridos`,
        buttons: ['OK'],
      });
      loading.dismiss();
      await alert.present();
    }
  }

  onSignup() {
    this.router.navigateByUrl('/signup');
  }

  async ionViewWillEnter() { //hasLoggedIn
    const { value } = await Preferences.get({ key: 'hasLoggedIn' });
      if (value == 'true') {
        this.router.navigateByUrl('/app/tabs/schedule', { replaceUrl: true });
      }
    this.menu.enable(false);
  }

  ionViewDidLeave() {
    // enable the root left menu when leaving the tutorial page
    this.menu.enable(true);
  }

}
