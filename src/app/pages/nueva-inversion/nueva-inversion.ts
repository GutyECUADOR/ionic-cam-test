import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { IInversion } from "../../interfaces/iinversion.interface";

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
  submitted = false;

  constructor(public router: Router,) {
    
  }

  onSubmit(form: NgForm) {
    this.submitted = true;

    return;
    if (form.valid) {
      this.router.navigateByUrl('/app/tabs/schedule');
    }
  }

  async cargarFoto() {
    console.log('Foto')
    const img_recibo = await Camera.getPhoto({
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera,
      quality: 100
    })
    this.inversion.imagen_recibo = img_recibo.dataUrl;
  }

}
