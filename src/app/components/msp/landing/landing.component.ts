import {Component, ViewChild} from '@angular/core';
import {MspConsentModalComponent} from "../common/consent-modal/consent-modal.component";

/**
 * Application for MSP
 *
 * IMG_2336.jpg
 * https://apps.gcpe.gov.bc.ca/jira/browse/PSPDN-255?filter=16000
 */
@Component({
    templateUrl: './landing.component.html',
    styleUrls: ['./landing.component.scss']
})
export class LandingComponent {
    lang = require('./i18n')

    @ViewChild('mspConsentModal') mspConsentModal: MspConsentModalComponent;

    constructor() {}

    ngAfterViewInit() {
        this.mspConsentModal.showFullSizeView();
    }

}
