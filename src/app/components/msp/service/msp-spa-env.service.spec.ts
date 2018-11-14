/* tslint:disable:no-unused-variable */
import {
    JsonpModule,
    Jsonp,
    BaseRequestOptions,
    Response,
    ResponseOptions,
    Http
} from "@angular/http";
import {TestBed, getTestBed, fakeAsync, tick} from '@angular/core/testing';
import {MspLogService} from './log.service';
import {MspDataService} from './msp-data.service';
import { LocalStorageService, LocalStorageModule } from 'angular-2-local-storage';
import {HttpClientModule} from '@angular/common/http';
import {RouterTestingModule} from '@angular/router/testing';
import {FormsModule} from '@angular/forms';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {MspSpaEnvServices, SpaEnvResponse} from '../service/msp-spa-env.service';

describe('MspSpaEnvServices', () => {
    let injector: TestBed;
    let service: MspSpaEnvServices;
    let httpMock: HttpTestingController;
    let spaEnvRes: SpaEnvResponse;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule, HttpClientModule,
          RouterTestingModule,
          FormsModule,
          LocalStorageModule.withConfig({
              prefix: 'ca.bc.gov.msp',
              storageType: 'sessionStorage'
          }) ],
        providers: [ LocalStorageService , MspSpaEnvServices, MspLogService, MspDataService]
      });
      injector = getTestBed();
      service = injector.get(MspSpaEnvServices);
      httpMock = injector.get(HttpTestingController);
    });

    it('Calling the Maintenance API', () => {
        const dummyResponse = [
          {"SPA_ENV_MCAP_MAINTENANCE_OPS":"false", "SPA_ENV_MCAP_MAINTENANCE_MESSAGE":"MSP System will be down from Time A to Time B"}];
        this.spaEnvRes = service.callSpaServer();
        const req = httpMock.expectOne('/env');
        expect(req.request.method).toBe("POST");
        req.flush(dummyResponse);
      });

  });