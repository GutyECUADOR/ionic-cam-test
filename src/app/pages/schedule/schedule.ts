import { Component, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonList, IonRouterOutlet, LoadingController, ModalController, ToastController, Config } from '@ionic/angular';

import { Preferences } from '@capacitor/preferences';

import { ConferenceData } from '../../providers/conference-data';
import { UserData } from '../../providers/user-data';

import { InversionService } from '../../services/inversion.service';

@Component({
  selector: 'page-schedule',
  templateUrl: 'schedule.html',
  styleUrls: ['./schedule.scss'],
})
export class SchedulePage implements OnInit {
  // Gets a reference to the list element
  @ViewChild('scheduleList', { static: true }) scheduleList: IonList;

  ios: boolean;
  dayIndex = 0;
  queryText = '';
  segment = 'all';
  excludeTracks: any = [];
  shownSessions: any = [];
  groups: any = [];
  confDate: string;
  showSearchbar: boolean;
  inversiones: any = [];

  constructor(
    public alertCtrl: AlertController,
    public confData: ConferenceData,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    public router: Router,
    public routerOutlet: IonRouterOutlet,
    public toastCtrl: ToastController,
    public userData: UserData,
    public config: Config,
    public inversionService: InversionService
  ) { }

  async ngOnInit() { //hasLoggedIn
    const { value } = await Preferences.get({ key: 'hasLoggedIn' });
      if (value != 'true') { // Fix login
        this.router.navigateByUrl('/login', { replaceUrl: true });
      }
  

    this.ios = this.config.get('mode') === 'ios';
  }

  ionViewWillEnter() {
    this.getInversiones();
  }

  getInversiones(){
    this.inversionService.getInversiones().subscribe(async reponse => {
      this.inversiones = reponse.inversiones;
      console.log(this.inversiones);
      const toast = await this.toastCtrl.create({
        header: `${reponse.message}  `,
        duration: 3000,
        buttons: [{
          text: 'Cerrar',
          role: 'cancel'
        }]
      });

      await toast.present();
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

  titleCaseWord(word: string) {
    if (!word) return word;
    return word[0].toUpperCase() + word.substr(1).toLowerCase();
  }


}
