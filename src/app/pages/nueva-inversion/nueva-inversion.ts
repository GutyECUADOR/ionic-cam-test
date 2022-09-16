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
    tipo: '',
    monto: 10,
    fecha_inversion: '',
    fecha_pago: '',
    imagen_recibo: null,
    user_id: null,
    estado: 'pendiente',
    created_at: '',
    updated_at: '',
  };
  imagen_src: string;
  submitted = false;

  constructor(public router: Router, 
    public inversionService: InversionService,
    public alertCtrl: AlertController,) {
    
  }

  async onSubmit(form: NgForm) {
    this.submitted = true;
    if (form.valid) {
      this.inversionService.postCreateInversion(this.inversion).subscribe( async data => {
        console.log(data);
        const alert = await this.alertCtrl.create({
          header: 'Registro Exitoso',
          message: `${data.message}. Su inversión esta siendo validada.`,
          buttons: ['Aceptar'],
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
    }
    
  }

}
