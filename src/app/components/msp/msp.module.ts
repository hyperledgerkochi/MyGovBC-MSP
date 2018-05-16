import {NgModule, Injectable} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser'

import {RouterModule, Routes} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import { ModalModule, AccordionModule} from 'ngx-bootstrap';
import {Ng2CompleterModule} from "ng2-completer";
import {MspComponent} from './msp.component';
import {LandingComponent} from './landing/landing.component';
import {MspConsentModalComponent} from "./common/consent-modal/consent-modal.component";
import {MspLoggerDirective} from "./common/logging/msp-logger.directive";
import {KeyboardEventListner} from "./common/keyboard-listener/keyboard-listener.directive";
import {MspDataService} from './service/msp-data.service';
import { MspValidationService } from './service/msp-validation.service';
import { CompletenessCheckService } from './service/completeness-check.service';
import { LocalStorageModule } from 'angular-2-local-storage';
import {MspApiService} from "./service/msp-api.service";
import {MspLogService} from "./service/log.service"
import {ProcessService} from "./service/process.service";

import { CaptchaDataService } from "mygovbc-captcha-widget/src/app/captcha-data.service";


const APP_ROUTES : Routes = [
    {
        path: 'msp',
        children: [
            {
                path: '',
                component: LandingComponent
            }
        ]
    },
    {path: '**', redirectTo: '/msp'}
];

/**
 * The overall progress layout is created based on 'msp-prepare-v3-a.jpeg' in
 * https://apps.gcpe.gov.bc.ca/jira/browse/PSPDN-255?filter=16000
 */
@NgModule({
    imports: [
        BrowserModule,
        CommonModule,
        FormsModule,
        ModalModule,
        AccordionModule,
        Ng2CompleterModule,
        RouterModule.forChild(APP_ROUTES),
        LocalStorageModule.withConfig({
            prefix: 'ca.bc.gov.msp',
            storageType: 'sessionStorage'
        })
    ],
    declarations: [
        MspLoggerDirective,
        KeyboardEventListner,
        // General
        MspComponent,
        LandingComponent,
        MspConsentModalComponent
    ],

    providers: [
        // Services
        MspDataService,
        MspValidationService,


        CompletenessCheckService,
        MspApiService,
        MspLogService,
        ProcessService,
        CaptchaDataService
    ]
})
@Injectable()
export class MspModule {

}
