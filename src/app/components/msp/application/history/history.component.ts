import  {
  Component, Input, Output, OnChanges, EventEmitter,
  SimpleChange, ViewChild, AfterViewInit, OnInit, OnDestroy, ElementRef, QueryList, ViewChildren, ChangeDetectorRef
} from '@angular/core';
import { state, trigger, style } from '@angular/animations';
import { NgForm } from '@angular/forms';
import { MspDataService } from '../../service/msp-data.service';
import {MspApplication} from "../../model/application.model";
import {Address} from "../../model/address.model";
import {History, ConditionHistory, SocialHistory, OccupationHistory } from "../../model/history.model";
import {Person} from "../../model/person.model";
import {BaseComponent} from "../../common/base.component";
import {MspAddressComponent} from "../../common/address/address.component";
import {MspPhoneComponent} from "../../common/phone/phone.component";
import {ProcessService} from "../../service/process.service";
import {Router} from "@angular/router";

@Component({
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent extends BaseComponent {

  static ProcessStepNum = 2;
  readonly headingBullet = '                      ○ ';
  readonly subHeadingBullet =  '                               \u25BB ';
  
  
  lang = require('./i18n');
  //public history: History;

  @ViewChild('formRef') form: NgForm;
  @ViewChild('address') address: MspAddressComponent;
  @ViewChild('phone') phone: MspPhoneComponent;
  @Input() person: Person;
  
  ConditionsListed: string; 
  public history: History = new History();
  
  mspApplication: MspApplication;
  canContinue: boolean;
  
  constructor(private dataService: MspDataService,
              private _router: Router,
              private _processService: ProcessService,
              private cd:ChangeDetectorRef) {
    super(cd);
    this.mspApplication = this.dataService.getMspApplication();
    this.history = this.mspApplication.history;
    console.log(this.mspApplication.applicant.firstName);
    
    /*if(this.history.conditionListed == undefined) {
      this.history.conditionListed ='• ';
    }*/
    
  }
  ngOnInit(){
    console.log("On init");
    this.initProcessMembers(HistoryComponent.ProcessStepNum, this._processService);
    this.initHistoryResponse();
    console.log('---------'+this.history.conditionListed);
    if(this.mspApplication.applicant.fName == "James" && this.mspApplication.applicant.lName == "Hamm"){
        this.fakeHistoryResponse();
    }
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
      this.mspApplication.mailingAddress = new Address();
    }
    this.dataService.saveMspApplication();
  }

  handleAddressUpdate(evt:any){
    // console.log('address update event: %o', evt);
    this.dataService.saveMspApplication();
  }



  showNextQuestion() {
    console.log(this.history);
    if(this.history.conditionListed != this.headingBullet) {
      console.log('----Check the condition- 222--'+this.history.showConditionHistory);
        this.history.showConditionHistory = true;
    } else {
        this.history.showConditionHistory = false;
    }

    this.history.showlivingArrangement = (this.history.conditionHistory != this.headingBullet  && this.history.conditionHistory != "") ? true : false;
    this.history.showWorkHistory = (this.history.livingArrangement != this.headingBullet && this.history.livingArrangement != "") ? true: false;
    this.canContinue = (this.history.workHistory != this.headingBullet && this.history.workHistory != "") ? true: false;
    this.dataService.saveMspApplication();
    console.log(this.history);
    
    //return this.isAllValid();
  }


  onKeydownEvent( event: KeyboardEvent): void { 
    
    if (event.keyCode === 13 && event.key === 'Enter') {
      let elementId: string = (event.target as Element).id;
      
      console.log(event);
      // subHeadingBullet =  '           \u25BB ';
      // Below Code Add Bullet in the Text Area when the user presses Enter 
      // First questions Health Conditions
      if(elementId === 'Conditions') {
      
        var text = this.history.conditionListed;
        //console.log (text.substring(text.length - 25, text.length - 1));
        //console.log(this.headingBullet);
        if ((text.length - 25) >= 0 && text.substring(text.length - 25, text.length - 1) === this.headingBullet)
          this.history.conditionListed  = text.substring(0, text.length - 25) + this.subHeadingBullet;
        else
          this.history.conditionListed += this.headingBullet;
      }
  
      // Second Questions - Condition History 
      if(elementId === 'ConditionHistory') {
        var text = this.history.conditionHistory;
      
        if ((text.length - 25) >= 0 && text.substring(text.length - 25, text.length - 1) === this.headingBullet)
          this.history.conditionHistory  = text.substring(0, text.length - 25) + this.subHeadingBullet;
        else
          this.history.conditionHistory += this.headingBullet;
        
      }

      // 3rd Question - Living Condition
      if(elementId  === 'LivingArrangement') {
        var text = this.history.livingArrangement;
      
        if ((text.length - 25) >= 0 && text.substring(text.length - 25, text.length - 1) === this.headingBullet)
          this.history.livingArrangement  = text.substring(0, text.length - 25) + this.subHeadingBullet;
        else
          this.history.livingArrangement += this.headingBullet;
      
      }

      //4th Question Work 
      if(elementId === 'WorkHistory') {
        var text = this.history.workHistory;
      
        if ((text.length - 25) >= 0 && text.substring(text.length - 25, text.length - 1) === this.headingBullet)
          this.history.workHistory  = text.substring(0, text.length - 25) + this.subHeadingBullet;
        else
          this.history.workHistory += this.headingBullet;
      }

      console.log(event);
        // On 'Shift+Enter' do this...
    }
  }
  
  fakeHistoryResponse() { 
    this.history.showConditionHistory = true;
    this.history.showlivingArrangement = true;
    this.history.showWorkHistory = true;
    this.canContinue = true;

    if(this.history.conditionListed.length == 68 || this.history.conditionListed == this.headingBullet) {
       this.history.conditionListed = this.headingBullet+"Depression\n"+this.headingBullet+"Back Pain";
    }
    
    if(this.history.conditionHistory.length == 299 || this.history.conditionHistory == this.headingBullet) {
      this.history.conditionHistory = this.headingBullet+"Depression History\n"+this.subHeadingBullet+"Started 3 Years ago after bereavement\n"+this.subHeadingBullet+"Regular visits to the GP. No psychiatristor CPN\n"+this.subHeadingBullet+"Has had counselling at practice";
    }

    if(this.history.livingArrangement.length == 87 || this.history.livingArrangement == this.headingBullet) {
      this.history.livingArrangement = this.headingBullet+"Lives in a 2nd floor\n"+this.headingBullet+"Lives with Partner";
    }

    if(this.history.workHistory.length == 162 || this.history.workHistory == this.headingBullet){
      this.history.workHistory = this.headingBullet+"Last worked in a warehouse\n"+this.headingBullet+"Stopped 3 years ago\n"+this.headingBullet+"Stopped due to depression after bereavement";
    }
    
  }


  initHistoryResponse() {

    if(this.history.conditionListed == undefined) {
      this.history.conditionListed = this.headingBullet;
    }

    if(this.history.conditionHistory == undefined) {
      this.history.conditionHistory = this.headingBullet;
    }

    if(this.history.livingArrangement == undefined) {
      this.history.livingArrangement = this.headingBullet;
    }

    if(this.history.workHistory == undefined) {
      this.history.workHistory = this.headingBullet;
    }
    
    this.canContinue = (this.history.workHistory != this.headingBullet && this.history.workHistory != "") ? true: false;
    

  }

  continue() {
    // console.log('personal info form itself valid: %s', this.form.valid);
    console.log('combinedValidationState on address: %s', this.isAllValid());
    console.log('History: ', this.history);
    
    if(!this.isAllValid()){
      console.log('Please fill in all required fields on the form.');
    }else{
      console.log('Proceeding with the steps');
      this._processService.setStep(2, true);
      this._router.navigate(['/msp/application/question']);
    }
  }
}