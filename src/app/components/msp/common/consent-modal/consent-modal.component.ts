import {Component, EventEmitter, Input, Output, ViewChild, Inject} from '@angular/core'
import {ModalDirective} from "ngx-bootstrap";

import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'msp-consent-modal',
  templateUrl: './consent-modal.component.html',
  // providers: []
})
export class MspConsentModalComponent {
  lang = require('./i18n');

  @Input() processName: string;
  @ViewChild('fullSizeViewModal') public fullSizeViewModal: ModalDirective;
  @Output() onClose = new EventEmitter<void>();

  public appConstants;

  constructor() {
    this.appConstants = environment.appConstants;
    console.log("mspIsInMaintenanceFlag"+this.appConstants.mspIsInMaintenanceFlag);
  }

  agreeCheck: boolean = false;

  showFullSizeView(){
    this.fullSizeViewModal.config.backdrop = false;
    this.fullSizeViewModal.config.keyboard = false;
    this.fullSizeViewModal.show();
  }

  continue() {
    this.fullSizeViewModal.hide();
    this.onClose.emit();
  }
}
