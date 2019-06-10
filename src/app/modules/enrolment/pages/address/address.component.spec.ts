import {TestBed, inject, async} from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { AddressComponent } from './address.component';
import { MspDataService } from '../../../../components/msp/service/msp-data.service';
import { CompletenessCheckService } from '../../../../components/msp/service/completeness-check.service';
import { LocalStorageService, LocalStorageModule } from 'angular-2-local-storage';
import {MspApplication} from '../../../../components/msp/model/application.model';
import {MspAddressComponent} from '../../../../components/msp/common/address/address.component';
import {MspPhoneComponent} from '../../../../components/msp/common/phone/phone.component';
import { TypeaheadModule } from 'ngx-bootstrap';
import {MspProvinceComponent} from '../../../../components/msp/common/province/province.component';
import {MspDepartureDateComponent} from '../../../../components/msp/common/departure-date/departure-date.component';
import {MspReturnDateComponent} from '../../../../components/msp/common/return-date/return-date.component';
import {MspCountryComponent} from '../../../../components/msp/common/country/country.component';
import {MspCancelComponent} from '../../../../components/msp/common/cancel/cancel.component';
import {ModalModule} from 'ngx-bootstrap';
import {MspLoggerDirective} from '../../../../components/msp/common/logging/msp-logger.directive';
import { MspLogService } from '../../../../components/msp/service/log.service';
import { MspValidationService } from '../../../../components/msp/service/msp-validation.service';
import { ProcessService } from '../../../../components/msp/service/process.service';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientModule} from '@angular/common/http';

describe('Application Address Component Test', () => {

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [AddressComponent, MspAddressComponent, MspPhoneComponent, MspProvinceComponent,
                MspDepartureDateComponent, MspReturnDateComponent, MspCountryComponent,
                MspCancelComponent, MspLoggerDirective],
            imports: [FormsModule, TypeaheadModule, ModalModule.forRoot(), HttpClientModule, RouterTestingModule, LocalStorageModule.withConfig({
                prefix: 'ca.bc.gov.msp',
                storageType: 'sessionStorage'
              })],
            providers: [MspDataService, CompletenessCheckService, MspLogService, MspValidationService, ProcessService
            ]
        });
    });

    it ('should work', () => {
        const fixture = TestBed.createComponent(AddressComponent);

        (fixture.componentInstance as AddressComponent).mspApplication = new MspApplication();

        expect(fixture.componentInstance instanceof AddressComponent).toBe(true, 'should create AddressComponent');
    });
});