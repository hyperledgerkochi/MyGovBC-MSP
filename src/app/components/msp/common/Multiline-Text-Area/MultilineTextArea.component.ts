import { ChangeDetectorRef, Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BaseComponent } from "../base.component";
import {History} from "../../model/history.model";
import {Question} from "../../model/question.model";


@Component({
  selector: 'msp-textarea',
  templateUrl: './MultilineTextArea.component.html',
  styleUrls: ['./MultilineTextArea.component.scss']
})
export class MultiLineTextArea extends BaseComponent {

  @Input() data: boolean;
  @Input() conditionValue: string;
  @Input() label: string = "Drugs";
  @Input() question: Question = new Question();;
  @Input() id: string;
  @Input() name: string;
  @Input() row: number;
  @Input() userResponseField: string;
  @Input() history: History = new History();
  @Output() onkeyup = new EventEmitter<string>();

  readonly headingBullet = '     ○ ';


  constructor(private cd: ChangeDetectorRef) {
    super(cd);
    console.log(this.userResponseField);
    //if(this.userResponseField == undefined) {
      this.userResponseField = this.headingBullet;
    console.log(this.userResponseField);
    //}
  }

  ngOnInit(){ 

    this.userResponseField = this.headingBullet;

  }
 
  //Invalid if boolean is undefined, null, etc. User must make a choice.
  isValid(): boolean {
    return this.data === true || this.data === false;
  }

  ngOnChanges(){
    this.emitIsFormValid();
  }


  onKeydownEvent( event: KeyboardEvent): void { 
    console.log(event);
    console.log(event.target);
    console.log(this.userResponseField);
    
    // When the user presses Enter 
      if (event.keyCode === 13 && event.key === 'Enter') {
        let elementId: string = (event.target as Element).id;
        console.log(this.question)
        console.log(this.name);
        console.log(elementId);
        const subHeadingBullet =  '           \u25BB ';
        // Below Code Add Bullet in the Text Area when the user presses Enter 
        // First questions Health Conditions
        //if(elementId === 'Conditions') {
        
          var text = this.userResponseField; //this.history.conditionListed;
        
          if(text.length - 8 >= 0)
          //console.log (">>>(" + text.substring(text.length - 8, text.length - 1) + ')');
          if ((text.length - 8) >= 0 && text.substring(text.length - 8, text.length - 1) === this.headingBullet)
            this.userResponseField = text.substring(0, text.length - 8) + subHeadingBullet;
          else
            this.userResponseField += this.headingBullet;
        //}
    
        /* Second Questions - Condition History 
        if(elementId === 'ConditionHistory') {
          var text = this.history.conditionHistory;
        
          if(text.length - 8 >= 0)
          //console.log (">>>(" + text.substring(text.length - 8, text.length - 1) + ')');
          if ((text.length - 8) >= 0 && text.substring(text.length - 8, text.length - 1) === this.headingBullet)
            this.history.conditionHistory  = text.substring(0, text.length - 8) + subHeadingBullet;
          else
            this.history.conditionHistory += this.headingBullet;
          
        }
  
        // 3rd Question - Living Condition
        if(elementId  === 'LivingArrangement') {
          var text = this.history.livingArrangement;
        
          if(text.length - 8 >= 0)
          //console.log (">>>(" + text.substring(text.length - 8, text.length - 1) + ')');
          if ((text.length - 8) >= 0 && text.substring(text.length - 8, text.length - 1) === this.headingBullet)
            this.history.livingArrangement  = text.substring(0, text.length - 8) + subHeadingBullet;
          else
            this.history.livingArrangement += this.headingBullet;
        
        }
  
        //4th Question Work 
        if(elementId === 'WorkHistory') {
          var text = this.history.workHistory;
        
          if(text.length - 8 >= 0)
          if ((text.length - 8) >= 0 && text.substring(text.length - 8, text.length - 1) === this.headingBullet)
            this.history.workHistory  = text.substring(0, text.length - 8) + subHeadingBullet;
          else
            this.history.workHistory += this.headingBullet;
        }
        */
        console.log(event);
          // On 'Shift+Enter' do this...
      }
    }

}
