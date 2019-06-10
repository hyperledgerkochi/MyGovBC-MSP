import {
  Component, Input, Output, EventEmitter,
  ViewChild, ElementRef, ChangeDetectorRef
} from '@angular/core';
import { state, trigger, style } from '@angular/animations';
import { NgForm } from '@angular/forms';
import { MspPerson, Gender } from '../../../../components/msp/model/msp-person.model';
import { OutofBCRecord } from '../../../../components/msp/model/outof-bc-record.model';
import {
  StatusRules, ActivitiesRules, StatusInCanada, Activities,
  DocumentRules, Documents, Relationship
} from '../../../../components/msp/model/status-activities-documents';
import { MspImage } from '../../../../components/msp/model/msp-image';
import * as _ from 'lodash';
import {MspIdReqModalComponent} from '../id-req-modal/id-req-modal.component';
import {MspImageErrorModalComponent} from '../image-error-modal/image-error-modal.component';
import {MspFileUploaderComponent} from '../../../../components/msp/common/file-uploader/file-uploader.component';
import {MspBirthDateComponent} from '../birthdate/birthdate.component';
import {MspNameComponent} from '../../../../components/msp/common/name/name.component';
import {MspGenderComponent} from '../../../../components/msp/common/gender/gender.component';
import {MspSchoolDateComponent} from '../../../../components/msp/common/schoolDate/school-date.component';
import {HealthNumberComponent} from '../../../../components/msp/common/health-number/health-number.component';
import {MspDischargeDateComponent} from '../../../../components/msp/common/discharge-date/discharge-date.component';
import {MspAddressComponent} from '../../../../components/msp/common/address/address.component';

import {MspArrivalDateComponent} from '../../../../components/msp/common/arrival-date/arrival-date.component';
import {MspOutofBCRecordComponent} from '../../../../components/msp/common/outof-bc/outof-bc.component';
import {MspProvinceComponent} from '../../../../components/msp/common/province/province.component';
import {BaseComponent} from '../../../../components/msp/common/base.component';
import {MspCountryComponent} from '../../../../components/msp/common/country/country.component';
import { ServicesCardDisclaimerModalComponent } from '../services-card-disclaimer/services-card-disclaimer.component';
//import { PhnComponent } from 'moh-common-lib';
@Component({
    selector: 'msp-personal-details',
    templateUrl: './personal-details.component.html',
    styleUrls: ['./personal-details.component.scss'],

    animations: [
      trigger('shrinkOut', [
        state('in', style({ display: 'none'})),
        state('out', style({ display: 'block'}))
        // transition('* => *', animate(500))
      ]),

      trigger('shrinkOutStatus', [
        state('in', style({ display: 'none' })),
        state('out', style({ display: 'block'}))
        // transition('* => *', animate(500))
      ]),

      trigger('genderListSignal', [
        state('in', style({ display: 'none' })),
        state('out', style({ display: 'block'}))
        // transition('* => *', animate(500))
      ]),

      trigger('institutionWorkSignal', [
        state('in', style({ display: 'none' })),
        state('out', style({ display: 'block'}))
        // transition('* => *', animate(500))
      ])
    ]

  }
)

export class PersonalDetailsComponent extends BaseComponent {
  lang = require('./i18n');
  langStatus = require('../../../../components/msp/common/status/i18n');
  langActivities = require('../../../../components/msp/common/activities/i18n');
  langDocuments = require('../../../../components/msp/common/documents/i18n');

  radioLabel = [
    {
      'label': '0',
      'value': 'Not new to B.C. but need to apply for MSP'
    },
    {
      'label': '1',
      'value': 'Moved to B.C. from another province'
    },
    {
      'label': '2',
      'value': 'Moved to B.C. from another country'
    },
    {
      'label': '3',
      'value': 'Working in B.C.'
    },
    {
      'label': '4',
      'value': 'Studying in B.C.'
    },
    {
      'label': '5',
      'value': 'Religious worker'
    },
    {
      'label': '6',
      'value': 'Diplomat'
    },
    {
      'label': '7',
      'value': 'Visiting'
    }
  ];

  // Expose some types to template
  Activities: typeof Activities = Activities;
  Relationship: typeof Relationship = Relationship;
  StatusInCanada: typeof StatusInCanada = StatusInCanada;
  public styleClass = 'control-label';
  @ViewChild('formRef') form: NgForm;
  @ViewChild('fileUploader') fileUploader: MspFileUploaderComponent;
  @ViewChild('idReqModal') idReqModal: MspIdReqModalComponent;
  @ViewChild('imageErrorModal') imageErrorModal: MspImageErrorModalComponent;
  @ViewChild('outOfBCRecord') outOfBCRecord: MspOutofBCRecordComponent;
  @ViewChild('gender') gender: MspGenderComponent;
  @ViewChild('birthDate') birthdate: MspBirthDateComponent;
  @ViewChild('name') name: MspNameComponent;
  @ViewChild('country') country: MspCountryComponent;
  @ViewChild('province') province: MspProvinceComponent;
  @ViewChild('arrivalDateBC') arrivalDateBC: MspArrivalDateComponent;
  @ViewChild('arrivalDateCanada') arrivalDateCanada: MspArrivalDateComponent;
  @ViewChild('healthNumber') healthNumber: HealthNumberComponent;
 // @ViewChild('phn') phn: PhnComponent;
  @ViewChild('armedForcedQuestion') armedForcedQuestion: HTMLElement;
  @ViewChild('dischargeDate') dischargeDate: MspDischargeDateComponent;
  @ViewChild('schoolQuestion') schoolQuestion: HTMLElement;
  @ViewChild('inBCAfterStudiesQuestion') inBCAfterStudiesQuestion: HTMLElement;
  @ViewChild('schoolAddress') schoolAddress: MspAddressComponent;
  @ViewChild('schoolDate') schoolDate: MspSchoolDateComponent;
  @ViewChild('mspServicesCardModal') servicesCardDisclaimerModalComponent: ServicesCardDisclaimerModalComponent;

  @Input() person: MspPerson;
  @Input() id: string;
  @Input() showError: boolean;
  @Output() notifyChildRemoval: EventEmitter<MspPerson> = new EventEmitter<MspPerson>();
  @Output() notifySpouseRemoval: EventEmitter<MspPerson> = new EventEmitter<MspPerson>();
  @Output() onChange: EventEmitter<any> = new EventEmitter<any>();

  shrinkOut: string;
  shrinkOutStatus: string;
  genderListSignal: string;
  institutionWorkSignal: string;
  showServicesCardModal: boolean = false;
  private value: any = {};

  public statusinCanada: Array<any> = [
      { value: 1, label: ' Canadian Citizen' },
      { value: 2, label: 'Permanent Resident' },
      { value: 3, label: 'Temporary Permit Holder or Diplomat' }
  ];
  /*
  public statusIn = [
    { value: 1, label: ' Canadian Citizen' },
    { value: 2, label: 'Permanent Resident' },
    { value: 3, label: 'Temporary Permit Holder or Diplomat' }
  ];*/

  constructor(private el: ElementRef,
    private cd: ChangeDetectorRef){
    super(cd);
  }

  statusLabel(): string {
    return this.lang('./en/index.js').statusLabel[this.person.relationship];
  }

  institutionList: string[] = ['Yes', 'No'];

  /**
   * Gets status available to the current person
   */
  get statusInCanada(): StatusInCanada[] {
    return StatusRules.availableStatus(this.person.relationship);
  }


  public refreshValue(value: any): void {
    this.value = value;
  }

  public removed(value: any): void {
    console.log('Removed value is: ', value);
  }

  public selected(value: any): void {
    console.log('Selected value is: ', value);
  }

  public typed(value: any): void {
    console.log('New search input: ', value);
  }


  setStatus(value: StatusInCanada, p: MspPerson) {
    p.status = value;
    p.currentActivity = null;

    if (p.status !== StatusInCanada.CitizenAdult){
      p.institutionWorkHistory = 'No';
    }
    this.showServicesCardModal = true ;

    this.onChange.emit(value);
  }

  setActivity(value: Activities) {

      if (this.showServicesCardModal && this.person.bcServiceCardShowStatus && this.person.relationship !== this.Relationship.ChildUnder19) {
          this.servicesCardDisclaimerModalComponent.showModal();
          this.showServicesCardModal = false;
      }

      this.person.currentActivity = value;
      this.person.movedFromProvinceOrCountry = '';
      this.onChange.emit(value);
  }

  /**
   * Gets the available activities given the known status
   */
  get activities(): Activities[] {
    return ActivitiesRules.availableActivities(this.person.relationship, this.person.status);
  }

  /**
   * Gets the available documents given the known status and activity
   */
  get documents(): Documents[] {
    return DocumentRules.availiableDocuments(this.person.status, this.person.currentActivity);
  }

  /**
   * Gets the available documents given the known status and activity
   */
  get nameChangeDocuments(): Documents[] {
    return DocumentRules.nameChangeDocument();
  }

  addDocument(evt: MspImage){
    // console.log('image added: %s', evt);
    this.person.documents.images = this.person.documents.images.concat(evt);
    console.log('$fileParent (1) addDocument', {images: this.person.documents.images, evt: evt});

    this.fileUploader.forceRender();
    this.onChange.emit(evt);
  }

  deleteDocument(evt: MspImage){
    this.person.documents.images = this.person.documents.images.filter(
      (mspImage: MspImage) => {
        return evt.uuid !== mspImage.uuid;
      }
    );
    this.onChange.emit(evt);
  }

  errorDocument(evt: MspImage) {
    this.imageErrorModal.imageWithError = evt;
    this.imageErrorModal.showFullSizeView();
    this.imageErrorModal.forceRender();
  }

  ngAfterContentInit() {
    super.ngAfterContentInit();

    this.cd.detectChanges();
    /**
     * Load an empty row to screen
     */
    if (this.person.relationship === Relationship.Spouse){
      window.scrollTo(0, this.el.nativeElement.offsetTop);
    }
  }

  get arrivalDateLabel(): string {
    if (this.person.currentActivity === Activities.LivingInBCWithoutMSP) {
      return this.lang('./en/index.js').arrivalDateToBCLabelForReturning;
    }
    return this.lang('./en/index.js').arrivalDateToBCLabel;
  }

  provinceUpdate(evt: string){
    this.person.movedFromProvinceOrCountry = evt;
    this.onChange.emit(evt);
  }

  get schoolInBC(): boolean {
    return this.person.schoolAddress
      && this.person.schoolAddress.province
      && this.person.schoolAddress.province.toLowerCase() === 'british columbia';
  }
  setFullTimeStudent(event: any) {
    this.person.fullTimeStudent = event;
    if (!this.person.fullTimeStudent) {
      this.person.inBCafterStudies = null;
    }
    this.onChange.emit(event);
    this.emitIsFormValid();
  }

  setGenderVal(event: string) {
    this.person.gender = (event === 'M') ? Gender.Male : Gender.Female;
    this.onChange.emit(event);
  }

  setStayInBCAfterStudy(event: any){
    event = event === 'True' ? true : false;
    this.person.inBCafterStudies = event;
    this.onChange.emit(event);
    this.emitIsFormValid();
    this.emitIsFormValid();
  }

  schoolAddressUpdate(evt: any){
    this.onChange.emit(evt);
  }


  setHasPreviousPhn(value: any){
    this.person.hasPreviousBCPhn = value;
    this.onChange.emit(value);
    this.cd.detectChanges();
    this.emitIsFormValid();
  }
  updateSchoolExpectedCompletionDate(evt: any){
    // console.log('school expected completion date updated: %o', evt);
    this.person.studiesFinishedDay = evt.day;
    this.person.studiesFinishedMonth = evt.month;
    this.person.studiesFinishedYear = evt.year;
    this.onChange.emit(evt);
  }

  updateSchoolDepartureDate(evt: any){
    // console.log('school departure date updated: %o', evt);
    this.person.studiesDepartureDay = evt.day;
    this.person.studiesDepartureMonth = evt.month;
    this.person.studiesDepartureYear = evt.year;
    this.onChange.emit(evt);
  }

  removeChild(): void {
    this.notifyChildRemoval.emit(this.person);
    // this.notifyChildRemoval.next(id);
  }

  removeSpouse(): void {
    this.notifySpouseRemoval.emit(this.person);
  }

  get institutionWorkHistory(): string {
    return this.person.institutionWorkHistory;
  }

  selectInstitution(history: string) {
    this.person.institutionWorkHistory = history;
    if (history === 'No') {
      this.person.dischargeDay = null;
      this.person.dischargeMonth = null;
      this.person.dischargeYear = null;
    }
    this.cd.detectChanges();
    this.onChange.emit(history);
    this.emitIsFormValid();
  }

  toggleInstituationList() {
    this.institutionWorkSignal === 'out' ? this.institutionWorkSignal = 'in' : this.institutionWorkSignal = 'out';
  }

  get hasValidCurrentActivity(): boolean{
    const v = _.isNumber(this.person.currentActivity);
    return v;
  }

  get isInstitutionListShown() {
    return this.institutionWorkSignal === 'out';
  }

  handleHealthNumberChange(evt: string){
    this.person.healthNumberFromOtherProvince = evt;
    this.onChange.emit(evt);

  }

  setBeenOutsideForOver30Days(out: any){
    this.person.declarationForOutsideOver30Days = out;
    if (out){
      this.person.outOfBCRecord = new OutofBCRecord();
    }else {
      this.person.outOfBCRecord = null;
    }
    this.cd.detectChanges();
    this.onChange.emit(out);
    this.emitIsFormValid();
  }

  handleDeleteOutofBCRecord(evt: OutofBCRecord){
    this.person.outOfBCRecord = null;
    this.onChange.emit(evt);
  }

  handleOutofBCRecordChange(evt: OutofBCRecord){
    this.onChange.emit(evt);
  }
    //If false, then we don't want users continuing to further application;
  checkEligibility(): boolean {
        return !this.person.ineligibleForMSP;
  }

  setMovedToBCPermanently(moved: any){
    this.person.madePermanentMoveToBC = moved;
    this.onChange.emit(moved);
    this.emitIsFormValid();
  }
  setLivedInBCSinceBirth(lived: boolean){
    this.person.livedInBCSinceBirth = lived;
    this.onChange.emit(lived);
    this.emitIsFormValid();
    this.cd.detectChanges();
  }

  viewIdReqModal(event: Documents) {
    this.idReqModal.showFullSizeView(event);
  }

  isValid(): boolean {
    // Some inputs can be determine via the form.isValid,
    // check these explicitly

    // Status
    if (this.person.currentActivity == null) {
      return false;
    }

    // moved to bc permanently
    if (this.person.madePermanentMoveToBC == null) {
      console.log('madePermanentMoveToBC invalid');
      return false;
    }

    // outside bc 30 days
    if (this.person.declarationForOutsideOver30Days == null) {
      console.log('declarationForOutsideOver30Days invalid');
      return false;
    }

    // previous PHN
    if (this.person.hasPreviousBCPhn == null) {
      console.log('hasPreviousBCPhn invalid');
      return false;
    }

    // armed forces
    if (this.armedForcedQuestion != null &&
      this.person.institutionWorkHistory == null) {
      console.log('institutionWorkHistory invalid');
      return false;
    }

    if (this.person.isArrivalToBcBeforeDob){
      return false;
    }

      if (this.person.isArrivalToCanadaBeforeDob){
          return false;
      }

    // school
    if (this.schoolQuestion != null &&
      this.person.fullTimeStudent == null) {
      console.log('schoolQuestion invalid');
      return false;
    }
    if (this.person.fullTimeStudent &&
      this.person.inBCafterStudies == null) {
      console.log('inBCafterStudies invalid');
      return false;
    }

    return true;
  }
}