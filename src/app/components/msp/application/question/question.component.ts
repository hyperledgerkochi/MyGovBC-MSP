import {ChangeDetectorRef, Component, ViewChild, OnChanges} from '@angular/core'
import {NgForm} from "@angular/forms";
import { MspDataService } from '../../service/msp-data.service';
import {MspApplication} from "../../model/application.model";
import {Question} from "../../model/question.model";
import {BaseComponent} from "../../common/base.component";
import {MspAddressComponent} from "../../common/address/address.component";
import {MspPhoneComponent} from "../../common/phone/phone.component";
import {ProcessService} from "../../service/process.service";
import {Router} from "@angular/router";

@Component({
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent extends BaseComponent {
  static ProcessStepNum = 3;

  lang = require('./i18n');

  @ViewChild('formRef') form: NgForm;
  @ViewChild('address') address: MspAddressComponent;
  @ViewChild('phone') phone: MspPhoneComponent;
  public isMedication: boolean;
  public question: Question = new Question();
  readonly headingBullet = '                      ○ ';
  readonly subHeadingBullet =  '                               \u25BB ';
  

  mspApplication: MspApplication;
  canContinue : boolean = false;

  constructor(private dataService: MspDataService,
              private _router: Router,
              private _processService: ProcessService,
              private cd:ChangeDetectorRef) {
    super(cd);
    this.mspApplication = this.dataService.getMspApplication();
    this.question = this.mspApplication.question;
   
    this.isMedication = false;
  }
  ngOnInit(){
    this.initProcessMembers(QuestionComponent.ProcessStepNum, this._processService);
    this.initQuestionResponse();
    if(this.mspApplication.applicant.fName == "James" && this.mspApplication.applicant.lName == "Hamm"){
      this.fakeQuestionResponse();
    }
  }

  checkDepressionVal(event: boolean) {
    this.question.GpAboutDepression = event ;
    this.emitIsFormValid();

    this.question.showAdmittedtoHospital = (event == false) ? true: false;
  }

  checkIfGpAware(event: boolean) {
    this.question.IsGPAware = event ;
    this.question.showEverAdmittedtoHospital = true;
    this.emitIsFormValid();
  }

  
  checkSelfHarmed(event: boolean) {
    this.question.SelfHarmed = event ;
    this.emitIsFormValid();
  }

  setAdmissionVoluntary(event: boolean) {
    this.question.AdmissionVoluntary = event ;
    this.emitIsFormValid();
    this.canContinue =  true;
  }

  checkSectioned(event: boolean) {
    this.question.Sectioned = event ;
    this.emitIsFormValid();
  }
  
  checkAnyoneAboutDepression(event: boolean) {
    this.question.AnyoneAboutDepression = event ;
    this.emitIsFormValid();
  }

  
  checkAdmittedToHospital(event: boolean) {
    this.question.AdmittedToHospital = event ;
    this.emitIsFormValid();
    if(event == false ) {
      this.question.showHospitalName = false;
    }
    this.question.showAdmissionVoulntary = (event == false) ? true: false;
  }

  setUserValue(event: boolean) {
    this.isMedication = event;
    this.question.IsCurrentlyOnMedication = event;
    
    this.question.showGPDepression = (event == false) ? true : false ;
    this.emitIsFormValid();
    //this.canContinue = (event == false) ? true: false;

  }


  ngAfterViewInit():void {
    this.form.valueChanges.subscribe(values => {
      this.dataService.saveMspApplication();
    });
  }

  handlePhoneNumberChange(evt:any) {
    this.mspApplication.phoneNumber = evt;    
    this.dataService.saveMspApplication();
  }

  toggleMailingSameAsResidentialAddress(evt:boolean){
    this.mspApplication.mailingSameAsResidentialAddress = evt;
    if(evt){
     // this.mspApplication.mailingAddress = new Address();
    }
    this.dataService.saveMspApplication();
  }

  handleAddressUpdate(evt:any){
    // console.log('address update event: %o', evt);
    this.dataService.saveMspApplication();
  }

 /* canContinue(){
    return this.isAllValid();
  }*/

  showNextQuestion() {

    console.log('***2*****'+this.question);
    // Show GP aware question
    if(this.question.DrugsandDosages != this.headingBullet && this.question.DrugsandDosages != ''){
        this.question.showGPDepression = true;
    }

    // When the user fills and click How often do you see your GP 
    if(this.question.HowOften != this.headingBullet && this.question.HowOften != ''){
      this.question.showAdmittedtoHospital = true;
    }

    // When the user fills and click How often do you see your GP 
    if(this.question.whenAdmitted != this.headingBullet && this.question.whenAdmitted != ''){
      this.question.showHospitalName = true;
    }

    if(this.question.hospitalname  != this.headingBullet && this.question.hospitalname != ''){
      this.question.showAdmissionVoulntary = true; 
    }
    

  }

  continue() {
    // console.log('personal info form itself valid: %s', this.form.valid);
    console.log('combinedValidationState on address: %s', this.isAllValid());
    if(!this.isAllValid()){
      console.log('Please fill in all required fields on the form.');
    }else{
      console.log('Inside Address Components ');
      this._router.navigate(['/msp/application/review']);
    }
  }

  onKeydownEvent( event: KeyboardEvent): void { 

    if (event.keyCode === 13 && event.key === 'Enter') {
      let elementId: string = (event.target as Element).id;
      
      console.log(event);
      //const subHeadingBullet =  '           \u25BB ';
      
      // Below Code Add Bullet in the Text Area when the user presses Enter 
      // First questions Health Conditions
      if(elementId === 'DrugsandDosages') {
        var text = this.question.DrugsandDosages ;
        //console.log (">>>(" + text.substring(text.length - 8, text.length - 1) + ')');
        if ((text.length - 25) >= 0 && text.substring(text.length - 25, text.length - 1) === this.headingBullet)
          this.question.DrugsandDosages  = text.substring(0, text.length - 25) + this.subHeadingBullet;
        else
          this.question.DrugsandDosages += this.headingBullet;
      }
  
      // Second Questions - Condition History 
      if(elementId === 'HowOften') {
        var text = this.question.HowOften;
        if ((text.length - 25) >= 0 && text.substring(text.length - 25, text.length - 1) === this.headingBullet)
          this.question.HowOften  = text.substring(0, text.length - 25) + this.subHeadingBullet;
        else
          this.question.HowOften += this.headingBullet;
        
      }

      // 3rd Question - Living Condition
      if(elementId  === 'whenAdmitted') {
        var text = this.question.whenAdmitted;
        if ((text.length - 25) >= 0 && text.substring(text.length - 25, text.length - 1) === this.headingBullet)
          this.question.whenAdmitted  = text.substring(0, text.length - 25) + this.subHeadingBullet;
        else
          this.question.whenAdmitted += this.headingBullet;
      
      }

      //4th Question Work 
      if(elementId === 'hospitalname') {
        var text = this.question.hospitalname;
        if ((text.length - 25) >= 0 && text.substring(text.length - 25, text.length - 1) === this.headingBullet)
          this.question.hospitalname  = text.substring(0, text.length - 25) + this.subHeadingBullet;
        else
          this.question.hospitalname += this.headingBullet;
      }
      
      console.log(event);
        // On 'Shift+Enter' do this...
    }
  }


  initQuestionResponse() {

    if(this.question.DrugsandDosages == undefined) {
      this.question.DrugsandDosages = this.headingBullet;
    }

    if(this.question.HowOften == undefined) {
      this.question.HowOften = this.headingBullet;
    }

    if(this.question.whenAdmitted == undefined) {
      this.question.whenAdmitted = this.headingBullet;
    }

    if(this.question.hospitalname == undefined) {
      this.question.hospitalname = this.headingBullet;
    }

    this.canContinue = (this.question.AdmissionVoluntary != undefined ||  this.question.AdmittedToHospital == false || this.question.IsCurrentlyOnMedication == false || this.question.GpAboutDepression == false ) ? true: false ;

  }


  fakeQuestionResponse() { 
    if(this.question.IsCurrentlyOnMedication == undefined) {
      this.question.IsCurrentlyOnMedication = true;
    }

    if(this.question.GpAboutDepression == undefined) {
      this.question.GpAboutDepression = true;
    }
    
    if(this.question.IsGPAware == undefined) {
      this.question.IsGPAware = true;
    }
    
    if(this.question.AdmittedToHospital == undefined) {
      this.question.AdmittedToHospital = true;
    }
    
    if(this.question.AdmissionVoluntary == undefined) {
      this.question.AdmissionVoluntary = true;
    }
    console.log(this.question.DrugsandDosages.length+'--'+this.question.HowOften.length+'--'+this.question.whenAdmitted.length+'--'+this.question.hospitalname.length);
    if(this.question.DrugsandDosages.length == 46 || this.question.DrugsandDosages == this.headingBullet) {
      this.question.DrugsandDosages = this.headingBullet+"Sertraline 50 mg Daily";
    }
    if(this.question.HowOften.length == 31 || this.question.HowOften == this.headingBullet) {
      this.question.HowOften = this.headingBullet+"Monthly";
    }

    if(this.question.whenAdmitted.length == 33 || this.question.whenAdmitted == this.headingBullet) {
      this.question.whenAdmitted = this.headingBullet+"Last Year";
    }

    if(this.question.hospitalname.length == 38 || this.question.hospitalname == this.headingBullet) {
      this.question.hospitalname = this.headingBullet+"Royal Hospital";
    }
    
    // Continue Buttons
    this.question.showGPDepression = true;
    this.question.showAdmittedtoHospital = true;
    this.question.showAdmissionVoulntary = true;
    this.question.showHospitalName = true;
    this.canContinue = true;
  }

}