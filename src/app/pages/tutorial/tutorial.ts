import { Component, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';

import { MenuController } from '@ionic/angular';

import { Preferences } from '@capacitor/preferences';
import Swiper from 'swiper';

@Component({
  selector: 'page-tutorial',
  templateUrl: 'tutorial.html',
  styleUrls: ['./tutorial.scss'],
})
export class TutorialPage {
  showSkip = true;
  private slides: Swiper;

  constructor(
    public menu: MenuController,
    public router: Router,
    private cd: ChangeDetectorRef
  ) {}

  startApp() { //ion_did_tutorial
    this.router
      .navigateByUrl('/login', { replaceUrl: true })
      .then(() => {
        Preferences.set({
          key: 'ion_did_tutorial',
          value: 'true',
        });
      });
  }

  setSwiperInstance(swiper: Swiper) {
    this.slides = swiper;
  }

  onSlideChangeStart() {
    this.showSkip = !this.slides.isEnd;
    this.cd.detectChanges();
  }

  async ionViewWillEnter() { //ion_did_tutorial
    const { value } = await Preferences.get({ key: 'ion_did_tutorial' });
      if (value === 'true') {
        this.router.navigateByUrl('/login', { replaceUrl: true });
      }
   

    this.menu.enable(false);
  }

  ionViewDidLeave() {
    // enable the root left menu when leaving the tutorial page
    this.menu.enable(true);
  }
}
