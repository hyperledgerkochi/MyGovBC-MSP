import {NgModule, Injectable} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser'

import {RouterModule, Routes} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import { ModalModule, AccordionModule} from 'ngx-bootstrap';
import {MspComponent} from './msp.component';
import {LandingComponent} from './landing/landing.component';
import {MspConsentModalComponent} from "./common/consent-modal/consent-modal.component";



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
        RouterModule.forChild(APP_ROUTES),
    ],
    declarations: [
        // General
        MspComponent,
        LandingComponent,
        MspConsentModalComponent
    ],

    providers: [
        // Services
    ]
})
@Injectable()
export class MspModule {

}
