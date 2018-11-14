import {Component, EventEmitter, Input, Output, ViewChild, Inject} from '@angular/core'
import * as moment from 'moment';
import {ModalDirective} from "ngx-bootstrap";
import {ApplicationBase} from "../../model/application-base.model";
// jam - trying to inject appConstants
// 

import { environment } from '../../../../../environments/environment';
import {MspSpaEnvServices, SpaEnvResponse} from '../../../msp/service/msp-spa-env.service';
import { MspLog2Service } from '../../../msp/service/log2.service';


@Component({
  selector: 'msp-consent-modal',
  templateUrl: './consent-modal.component.html',
  // providers: []
})
export class MspConsentModalComponent {
  lang = require('./i18n');

  @Input() processName: string;
  @Input() application: ApplicationBase;
  @ViewChild('fullSizeViewModal') public fullSizeViewModal: ModalDirective;
  @Output() onClose = new EventEmitter<void>();

  public appConstants;
  public spaEnvRes: SpaEnvResponse = {} as any;


  constructor(private logService: MspLog2Service, private spaEnvService : MspSpaEnvServices) {
    this.appConstants = environment.appConstants;
    this.inMaintenance();
    console.log("mspIsInMaintenanceFlag"+this.appConstants.mspIsInMaintenanceFlag);
  }

  agreeCheck: boolean = false;

  showFullSizeView(){
    this.fullSizeViewModal.config.backdrop = false;
    this.fullSizeViewModal.config.keyboard = false;
    this.fullSizeViewModal.show();
  }

  continue() {
    this.application.infoCollectionAgreement = true;
    this.fullSizeViewModal.hide();
    this.onClose.emit();
  }

  inMaintenance() {
    this.spaEnvService.callSpaServer().subscribe(response => {
        this.spaEnvRes = <SpaEnvResponse> response;
        console.log("=====SPA ENV MSP Maintenance Flag==="+this.spaEnvRes.SPA_ENV_MCAP_MAINTENANCE_OPS+'--Message--'+this.spaEnvRes.SPA_ENV_MCAP_MAINTENANCE_MESSAGE);
    }, (error: Response | any) => {
       console.log('Error when calling the MSP Maintenance: '+error);
       console.log(this.logService.log({event: 'error', key: 'Error when calling the Maintenance API'}));
       this.logService.log({event: 'error', key: 'Error when calling the Maintenance API'});
    });
  }
}
