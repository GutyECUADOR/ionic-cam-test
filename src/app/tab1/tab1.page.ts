import { Component } from '@angular/core';
import { Camera, CameraResultType } from '@capacitor/camera';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  inversion_img : any

  constructor() {}

  async cargarFoto() {
    console.log('Foto')
    const img_recibo = await Camera.getPhoto({
      resultType: CameraResultType.DataUrl,
      quality: 100
    })
    this.inversion_img = img_recibo.dataUrl;
  }
}
