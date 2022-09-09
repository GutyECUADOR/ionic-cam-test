import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { NuevaInversion } from './nueva-inversion';
import { NuevaInversionRoutingModule } from './nueva-inversion-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NuevaInversionRoutingModule
  ],
  declarations: [NuevaInversion],
  bootstrap: [NuevaInversion],
})
export class AboutModule {}
