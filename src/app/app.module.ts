import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import {AccordionModule, ModalModule, TooltipModule} from 'ngx-bootstrap';
import { GeneralAppComponent } from './app.component';
// import { CoreFooterComponent } from './components/core/footer';
// import { CoreHeaderComponent } from './components/core/header';
import { MspModule } from './components/msp/msp.module';
import { HttpClientModule} from '@angular/common/http';
import {TextMaskModule} from 'angular2-text-mask';
import { SharedCoreModule } from 'moh-common-lib';
import { CaptchaModule } from 'moh-common-lib/captcha';
import { MspCoreModule } from './module/msp-core/msp-core.module';


require('./index.scss');
@NgModule({
  imports: [ TextMaskModule,
    BrowserModule,
    MspModule,
    HttpClientModule,
    SharedCoreModule,
    CaptchaModule,
    ModalModule.forRoot(),
    AccordionModule.forRoot(),
    TooltipModule.forRoot(),
    RouterModule.forRoot([
      { path: '', redirectTo: 'msp', pathMatch: 'full' }
    ]),
    MspCoreModule
  ],
  declarations: [
    GeneralAppComponent
  ],

  // CoreHeaderComponent, CoreFooterComponent
  bootstrap: [GeneralAppComponent]
})
export class AppModule {
}
