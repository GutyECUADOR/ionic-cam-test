import { Component } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { UserData } from '../../providers/user-data';
import { InversionService } from './../../services/inversion.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'page-session-detail',
  styleUrls: ['./session-detail.scss'],
  templateUrl: 'session-detail.html'
})
export class SessionDetailPage {
  session: any;
  inversion: any;
  isFavorite = false;
  defaultHref = '';

  constructor(
    public userData: UserData,
    private route: ActivatedRoute,
    public router: Router,
    public inversionService: InversionService,
    public alertCtrl: AlertController,
  ) { }

  ionViewWillEnter() {
    const inversion_id = parseInt(this.route.snapshot.paramMap.get('sessionId'));
    this.inversionService.getInversion(inversion_id).subscribe(async reponse => {
      this.inversion = reponse.inversion;
      console.log(this.inversion);
      
    }, async error => {
      console.log(error);
      const alert = await this.alertCtrl.create({
        header: 'Token caducado',
        message: `${error.statusText}. Reinicie sesión antes de invertir, su token no es válido`,
        buttons: [{
          text: 'Aceptar',
          role: 'confirm',
          handler: () => {
            console.log('Cerrar sesion');
            this.userData.logout().then(() => {
              return this.router.navigateByUrl('/login');
            });
          },
        }]
      });
      await alert.present();
    });
  }

  ionViewDidEnter() {
    this.defaultHref = `/app/tabs/schedule`;
  }

  descargarComprobante() {
    console.log('Descargando');
    let URL_comprobantes = environment.URL_comprobantes;
    window.open(`${URL_comprobantes}${this.inversion.imagen_recibo}`, "_blank");

  }

}
