import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';
import { Preferences } from '@capacitor/preferences';
@Injectable({
  providedIn: 'root'
})
export class CheckTutorial implements CanLoad {
  constructor(private router: Router) {}

  async canLoad() { //ion_did_tutorial
    const { value } = await Preferences.get({ key: 'ion_did_tutorial' });
      if (value === 'true') {
        this.router.navigate(['/app', 'tabs', 'schedule']);
        return false;
      } else {
        return true;
      }
    
  }
}
