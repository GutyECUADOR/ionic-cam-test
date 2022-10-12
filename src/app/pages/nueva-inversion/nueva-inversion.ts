import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

import { IInversion } from "../../interfaces/iinversion.interface";
import { InversionService } from '../../services/inversion.service';

import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';


@Component({
  selector: 'nueva-inversion',
  templateUrl: 'nueva-inversion.html',
  styleUrls: ['./nueva-inversion.scss'],
})
export class NuevaInversion {
  inversion: IInversion = {
    id: null,
    tasa: 0,
    dias_inversion: 0,
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
  imagen_src: string;
  tasa: number;
 
 
  submitted = false;

  constructor(public router: Router, 
    public inversionService: InversionService,
    public alertCtrl: AlertController,) {
    
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
      this.diasInversion = reponse.diasInversion;
      console.log(this.diasInversion);
    });
  }

  async onSubmit(form: NgForm) {
    this.submitted = true;
    if (form.valid) {
      this.inversionService.postCreateInversion(this.inversion).subscribe( async data => {
        console.log(data);
        const alert = await this.alertCtrl.create({
          header: 'Registro Exitoso',
          message: `${data.message}. Su inversión esta siendo validada.`,
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
        await alert.present();
      }, async error =>{
        console.log(error);
        const alert = await this.alertCtrl.create({
          header: 'Registro Fallido',
          message: `${error.error.message}. Verifique todos los campos. Y la imagen del comprobante.`,
          buttons: ['Aceptar'],
        });
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
  

}
