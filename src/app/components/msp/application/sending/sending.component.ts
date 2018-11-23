import {Component, Inject, Injectable, AfterContentInit, ViewChild, ElementRef} from '@angular/core';
import {MspApplication, Person} from '../../model/application.model';

import { MspDataService } from '../../service/msp-data.service';
import {MspApiService} from "../../service/msp-api.service";
import {Router} from "@angular/router";
import {ResponseType} from "../../api-model/responseTypes";
import {MspLogService} from '../../service/log.service'
import {ProcessService} from "../../service/process.service";
import {MspSpaEnvServices, SpaEnvResponse} from '../../service/msp-spa-env.service';

@Component({
  templateUrl: 'sending.component.html',
  styleUrls: ['./sending.component.scss']
})
@Injectable()
export class SendingComponent implements AfterContentInit {
  lang = require('./i18n');

  application: MspApplication;
  rawUrl: string;
  rawError: string;
  rawRequest: string;
  public spaEnvRes: SpaEnvResponse;

  transmissionInProcess:boolean;
  hasError:boolean;
  showMoreErrorDetails:boolean;
  
  constructor(private dataService: MspDataService, private service: MspApiService, private processService:ProcessService,
    public router: Router, private logService: MspLogService, private spaEnvService: MspSpaEnvServices) {
    this.application = this.dataService.getMspApplication();
    this.transmissionInProcess = undefined;
    this.hasError = undefined;
    this.showMoreErrorDetails = undefined;
  }

  /**
   * always regnerate uuid for application and its images 
   * When user use browser back button, the uuid are guaranteed to be unique for API server.
   */
  ngAfterContentInit() {
    this.transmitApplication();
  }

  transmitApplication(){
    
    this.spaEnvService.callSpaServer().subscribe(response => {
      const spaResponse = <SpaEnvResponse> response;
      if(spaResponse && spaResponse.SPA_ENV_MCAP_MAINTENANCE_OPS && spaResponse.SPA_ENV_MCAP_MAINTENANCE_OPS === "true"){
          console.log('In Maintenance Mode: ', spaResponse.SPA_ENV_MCAP_MAINTENANCE_MESSAGE);
          this.hasError = true;
          this.transmissionInProcess = false;
          this.dataService.saveMspApplication();
          this.spaEnvRes = <SpaEnvResponse> spaResponse;
          throw new Error(this.spaEnvRes.SPA_ENV_MCAP_MAINTENANCE_MESSAGE);
      } else {
           // After view inits, begin sending the application
          this.transmissionInProcess = true;
          this.hasError = undefined;
          this.application.referenceNumber = Math.floor(100000 + Math.random() * 900000)+"";
          this.logService.log({name: 'Enrolment - Received refNo ',
          confirmationNumber: this.application.referenceNumber},"Enrolment - Submission Response Success");
          let tempRef = this.application.referenceNumber;

          //delete the application from storage
          this.dataService.removeMspApplication();

            //  go to confirmation
          setTimeout(() => {
              console.log('Test');
              this.router.navigate(["/msp/application/confirmation"],
                  {queryParams: {confirmationNum:tempRef}});

          }, 900);


        }
      });
    
    //  this.logService.log({name: 'Enrollment application submitting request'},"Enrollment : Submission Request");
     /* this.service
      .sendApplication(this.application)
      .then((application: MspApplication) => {
        this.application = application;*/
        
        
        
      /* }).catch((error: ResponseType | any) => {
        console.log('error in sending application: ', error);
        this.spaEnvRes = <SpaEnvResponse> error;
        this.hasError = true;
        this.rawUrl = error.url;
        this.rawError = error;
        this.rawRequest = error._requestBody
        this.logService.log({name: 'Enrolment - Received Failure ',
          error: error._body,
          request: error._requestBody},"Enrolment - Submission Response Error");
        this.transmissionInProcess = false;

        let oldUUID = this.application.uuid;
        this.application.regenUUID();

        console.log('EA uuid updated: from %s to %s', oldUUID, this.dataService.getMspApplication().uuid);

        this.application.authorizationToken = null;
        this.dataService.saveMspApplication();
      }); */

  }

  toggleErrorDetails(){
    this.showMoreErrorDetails = !this.showMoreErrorDetails;
  }

  retrySubmission(){
    this.router.navigate(['/msp/application/review']);
  }
}
