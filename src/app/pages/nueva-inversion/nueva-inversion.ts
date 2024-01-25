import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';

import { IInversion } from "../../interfaces/iinversion.interface";
import { InversionService } from '../../services/inversion.service';
import { LoadingController } from '@ionic/angular';
import { Clipboard } from '@capacitor/clipboard';

import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'nueva-inversion',
  templateUrl: 'nueva-inversion.html',
  styleUrls: ['./nueva-inversion.scss'],
})
export class NuevaInversion {
  inversion: IInversion = {
    id: null,
    tasa: null,
    dias_inversion: null,
    monto: 50,
    monto_recibir: 0,
    fecha_inversion: '',
    fecha_pago: '',
    imagen_recibo: null,
    user_id: null,
    estado: 'pendiente',
    created_at: '',
    updated_at: '',
  };
  tiposInversion = [];
  diasInversion = [];
  MAXIMO_VAL_INVERSION = 99999;
  imagen_src: string;
  tasa: number;


  submitted = false;

  constructor(public router: Router,
    public inversionService: InversionService,
    public alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    public toastCtrl: ToastController
    ) {

  }

  ionViewWillEnter() {
    this.getTiposInversion();
    this.getDiasInversion();
  }

  getTiposInversion() {
    this.inversionService.getTiposInversiones().subscribe(async reponse => {
      this.tiposInversion = reponse.tiposInversion;
      console.log(this.tiposInversion);
    });
  }

  getDiasInversion() {
    this.inversionService.getDiasInversiones().subscribe(async reponse => {
      console.log(reponse)
      this.diasInversion = reponse.diasInversion;
      console.log(this.diasInversion);
    });
  }

  async onSubmit(form: NgForm) {
    const loading = await this.loadingCtrl.create({
      message: 'Validando registro, espere...',
    });

    if (this.inversion.monto >= this.MAXIMO_VAL_INVERSION || this.inversion.monto < 10) {
      const alert_maximo = await this.alertCtrl.create({
        header: 'Monto de inversón no válido.',
        message: `Valor máximo de inversión máximo: $${this.MAXIMO_VAL_INVERSION}, minimo $10.`,
        buttons: [{
          text: 'Aceptar'
        }]
      });
      alert_maximo.present();
      return;
    }

    loading.present();
    this.submitted = true;
    if (form.valid) {
      this.inversionService.postCreateInversion(this.inversion).subscribe( async data => {
        console.log(data);
        const alert = await this.alertCtrl.create({
          header: 'Registro Exitoso',
          message: `${data.message}. Su inversión esta siendo validada. Confirme el pago de su inversión con nuestro soporte.`,
          buttons: [{
            text: 'Aceptar',
            role: 'confirm',
            handler: () => {
              form.resetForm();
              this.imagen_src = '';
              this.submitted = false;
              return this.router.navigateByUrl('/app/tabs/schedule');
            },
          }]
        });
        loading.dismiss();
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
          message: `Verifique todos los campos. Y la imagen del comprobante. ${erroresString}. `,
          buttons: ['Aceptar'],
        });
        loading.dismiss();
        await alert.present();
        this.submitted = false;
      });
    }
  }

  async cargarFoto() {
    console.log('Foto')
    const img_recibo = await Camera.getPhoto({
      resultType: CameraResultType.Base64,
      source: CameraSource.Camera,
      quality: 100
    })

    if (img_recibo) {
      this.inversion.imagen_recibo = img_recibo.base64String;
      this.imagen_src = `data:image/jpeg;base64,${img_recibo.base64String}`;
      /* console.log(this.inversion.imagen_recibo); */
    }

  }

  onSelectChangeTasa(selectedValue: any) {
    console.log('Selected', selectedValue);
    this.calculateAproximado();
  }

  onSelectChangeDiasInversion(selectedValue: any) {
    console.log('Selected', selectedValue);
    this.calculateAproximado();
  }

  calculateAproximado(){
    this.inversion.monto_recibir = ((this.inversion.monto * this.inversion.tasa) / 100) * this.inversion.dias_inversion + this.inversion.monto;
  }




  async BilleteraButtomHandler() {
    await Clipboard.write({
      string: environment.wallet
    });

    const toast = await this.toastCtrl.create({
      header: `Código de deposito copiado.`,
      duration: 3000,
      buttons: [{
        text: 'Cerrar',
        role: 'cancel'
      }]
    });
    await toast.present();
    window.open(environment.wallet, "_blank");
  };

}
