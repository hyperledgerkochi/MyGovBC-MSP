import { Component, Input, Output, OnChanges, EventEmitter } from '@angular/core';
import {MspApplicantioin, Applicant, Spouse, Child} from '../../application';

require('./personal-details.component.less')
@Component({
  selector: 'msp-personal-details',
  templateUrl: './personal-details.component.html'
}
)

export class PersonalDetailsComponent implements OnChanges{
  @Input() person: Applicant; 

  ngOnChanges():void {
    console.log('applicant set on details component: ' + JSON.stringify(this.person));
  }
}