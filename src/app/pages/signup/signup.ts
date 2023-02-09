import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

import { UserData } from '../../providers/user-data';
import { AuthService } from '../../services/auth.service';

import { UserOptions } from '../../interfaces/user-options';



@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
  styleUrls: ['./signup.scss'],
})
export class SignupPage {
  signup: UserOptions = { name: '', email: '', password: '' };
  submitted = false;

  constructor(
    public router: Router,
    public userData: UserData,
    public menu: MenuController,
    private loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    private authService: AuthService,
    
  ) {}

  async onSignup(form: NgForm) {
    const loading = await this.loadingCtrl.create({
      message: 'Validando registro, espere...',
    });
    loading.present();
    this.submitted = true;
    
    if (form.valid) {
      this.authService.registerByEmail(this.signup).subscribe( async data => {
        console.log(data);
        if (data.access_token) {
          loading.dismiss();
          const alertUserCreated = await this.alertCtrl.create({
            header: 'Registro Exitoso',
            message: `Ya puede iniciar sesión en la plataforma.`,
            buttons: [{
              text: 'Aceptar',
              role: 'confirm',
              handler: () => {
                this.router.navigateByUrl('/login');
              },
            }]
          });
          alertUserCreated.present();
        }
      }, async error =>{
        console.log(error.error.errors);
        let erroresString = '';
        Object.values(error.error.errors).forEach(error => {
          console.log(error[0]);
          erroresString += '<br>' + error[0];
        });
        const alert = await this.alertCtrl.create({
          header: 'Registro Fallido',
          message: `${erroresString}`,
          buttons: ['Aceptar'],
        });
        loading.dismiss();
        await alert.present();
      });
    }else{
      const alert = await this.alertCtrl.create({
        header: 'Registro Fallido',
        message: `Complete los campos requeridos`,
        buttons: ['OK'],
      });
      loading.dismiss();
      await alert.present();
    }
  }

  async ionViewWillEnter() { //hasLoggedIn
    this.menu.enable(false);
  }

  onReturnLogin() {
    this.router.navigateByUrl('/login');
  }
}
