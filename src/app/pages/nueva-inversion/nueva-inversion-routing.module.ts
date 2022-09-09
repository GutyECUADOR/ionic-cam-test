import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NuevaInversion } from './nueva-inversion';

const routes: Routes = [
  {
    path: '',
    component: NuevaInversion
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NuevaInversionRoutingModule { }
