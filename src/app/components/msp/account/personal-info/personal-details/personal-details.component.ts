import {
    Component, Input, Output, OnChanges, EventEmitter,
    SimpleChange, ViewChild, AfterViewInit, OnInit, OnDestroy,
    state, trigger, style, ElementRef, QueryList, ViewChildren, ChangeDetectorRef
} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Person} from '../../../model/person.model';
import {MspAccountApp} from '../../../model/account.model';
import {OutofBCRecord} from '../../../model/outof-bc-record.model';
import {
    StatusRules, ActivitiesRules, StatusInCanada, Activities,
    DocumentRules, Documents, Relationship
} from "../../../model/status-activities-documents";
import {MspImage} from '../../../model/msp-image';
import * as _ from 'lodash';
import {MspIdReqModalComponent} from "../../../common/id-req-modal/id-req-modal.component";
import {MspImageErrorModalComponent} from "../../../common/image-error-modal/image-error-modal.component";
import {FileUploaderComponent} from "../../../common/file-uploader/file-uploader.component";
import {MspBirthDateComponent} from "../../../common/birthdate/birthdate.component";
import {MspNameComponent} from "../../../common/name/name.component";
import {MspGenderComponent} from "../../../common/gender/gender.component";
import {MspPhnComponent} from "../../../common/phn/phn.component";
import {MspSchoolDateComponent} from "../../../common/schoolDate/school-date.component";
import {HealthNumberComponent} from "../../../common/health-number/health-number.component";
import {MspDischargeDateComponent} from "../../../common/discharge-date/discharge-date.component";
import {MspAddressComponent} from "../../../common/address/address.component";
import {Address} from "../../../model/address.model";

import {MspDataService} from '../../../service/msp-data.service';

import {MspArrivalDateComponent} from "../../../common/arrival-date/arrival-date.component";
import {MspOutofBCRecordComponent} from "../../../common/outof-bc/outof-bc.component";
import {MspProvinceComponent} from "../../../common/province/province.component";
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

import './personal-details.component.less';
import {BaseComponent} from "../../../common/base.component";
import {MspCountryComponent} from "../../../common/country/country.component";

@Component({
        selector: 'msp-account-personal-details',
        templateUrl: './personal-details.component.html',

        animations: [
            trigger('shrinkOut', [
                state('in', style({display: 'none'})),
                state('out', style({display: 'block'}))
                // transition('* => *', animate(500))
            ]),

            trigger('shrinkOutStatus', [
                state('in', style({display: 'none'})),
                state('out', style({display: 'block'}))
                // transition('* => *', animate(500))
            ]),

            trigger('genderListSignal', [
                state('in', style({display: 'none'})),
                state('out', style({display: 'block'}))
                // transition('* => *', animate(500))
            ]),

            trigger('institutionWorkSignal', [
                state('in', style({display: 'none'})),
                state('out', style({display: 'block'}))
                // transition('* => *', animate(500))
            ])
        ]

    }
)

export class AccountPersonalDetailsComponent extends BaseComponent {
    lang = require('./i18n');
    langStatus = require('../../../common/status/i18n');
    langAccountActivities = require('../../../common/account-activities/i18n');
    langDocuments = require('../../../common/documents/i18n');

    // Expose some types to template
    Activities: typeof Activities = Activities;
    Relationship: typeof Relationship = Relationship;
    StatusInCanada: typeof StatusInCanada = StatusInCanada;

    @ViewChild('formRef') form: NgForm;

    @ViewChild('gender') gender: MspGenderComponent;
    @ViewChild('birthDate') birthdate: MspBirthDateComponent;
    @ViewChild('name') name: MspNameComponent;
    @ViewChild('phn') phn: MspPhnComponent;


    @Input() person: Person;
    @Input() id: string;
    @Input() showError: boolean;
    /** Hides the 'Clear Spouse/Child' button. Useful in layouts where the button must be created elsewhere. */
    @Input() hideClearButton: boolean = false;
    @Output() notifyChildRemoval: EventEmitter<Person> = new EventEmitter<Person>();
    @Output() notifySpouseRemoval: EventEmitter<Person> = new EventEmitter<Person>();
    @Output() onChange: EventEmitter<any> = new EventEmitter<any>();
    shrinkOut: string;
    shrinkOutStatus: string;
    genderListSignal: string;
    institutionWorkSignal: string;
    mspAccountApp: MspAccountApp;

    constructor(private el: ElementRef,
                private cd: ChangeDetectorRef, private dataService: MspDataService) {
        super(cd);
        this.mspAccountApp = dataService.getMspAccountApp();
    }


    institutionList: string[] = ['Yes', 'No'];

    /**
     * Gets status available to the current person
     */
    get statusInCanada(): StatusInCanada[] {
        return StatusRules.availableStatus(this.person.relationship);
    }

    handlePhoneNumberChange(evt: any) {
        this.person.phoneNumber = evt;
        this.dataService.saveMspAccountApp();
    }

    setStatus(value: StatusInCanada, p: Person) {
        p.status = value;
        p.currentActivity = null;

        if (p.status !== StatusInCanada.CitizenAdult) {
            p.institutionWorkHistory = 'No';
        }
        this.onChange.emit(value);
    }

    setActivity(value: Activities) {
        this.person.currentActivity = value;
        this.person.movedFromProvinceOrCountry = '';
        this.onChange.emit(value);
    }

    toggleMailingSameAsResidentialAddress(evt: boolean) {
        this.person.mailingSameAsResidentialAddress = evt;
        if (evt) {
            this.person.mailingAddress = new Address();
        }
        this.dataService.saveMspAccountApp();
    }

    handleAddressUpdate(evt: any) {
        // console.log('address update event: %o', evt);
        this.dataService.saveMspAccountApp();
    }


    /**
     * Gets the available activities given the known status
     */
    get activities(): Activities[] {
        return ActivitiesRules.availableActivities(this.person.relationship, this.person.status);
    }


    ngAfterContentInit() {
        super.ngAfterContentInit();


        this.cd.detectChanges();
        /**
         * Load an empty row to screen
         */
        if (this.person.relationship === Relationship.Spouse) {
            window.scrollTo(0, this.el.nativeElement.offsetTop);
        }
    }


    removeChild(): void {
        this.notifyChildRemoval.emit(this.person);
        // this.notifyChildRemoval.next(id);
    }

    removeSpouse(): void {
        this.notifySpouseRemoval.emit(this.person);
    }


    get hasValidCurrentActivity(): boolean {
        let v = _.isNumber(this.person.currentActivity);
        return v;
    }

    get isInstitutionListShown() {
        return this.institutionWorkSignal === 'out';
    }

    handleHealthNumberChange(evt: string) {
        this.person.healthNumberFromOtherProvince = evt;
        this.onChange.emit(evt);

    }


    diplomat = (sp:Person) =>{
        return sp.status == StatusInCanada.TemporaryResident && sp.currentActivity === Activities.Diplomat
    };

    visitor = (sp:Person) =>{
        return sp.status == StatusInCanada.TemporaryResident && sp.currentActivity === Activities.Visiting
    };

    isValid(): boolean {
        return true;
    }
}
