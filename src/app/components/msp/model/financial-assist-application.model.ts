import {Address} from "./address.model";
import {Person} from "./person.model";
import {Relationship} from "./status-activities-documents";

export class FinancialAssistApplication {

  /**
   * Person applying for financial assitance
   */
  applicant: Person = new Person(Relationship.Applicant);

  /**
   * Spouse
   */
  spouse: Person = new Person(Relationship.Spouse);

  netIncomelastYear:number;

  /**
   * line 236 on NOA
   */
  spouseNetIncome: number;

  childrenCount:number;
  /**
   * Line 214 on NOA
   */
  claimedChildCareExpense_line214: number;

  /**
   * Line 117 on NOA
   */
  reportedUCCBenefit_line117: number;

  /**
   * Line 125
   */
  spouseDSPAmount_line125: number;

  ageOver65:boolean;
  private _hasSpouseOrCommonLaw: boolean;


  /**
   * Applicant himself or herself eligible for disablity credit flag
   */
  private eligibleForDisabilityCredit:boolean;
  private spouseOrCommonLawEligibleForDisabilityCredit:boolean;

  /**
   * Deductions
   */
  spouseAmout:number;
  disabilityCredit:number;
  reportedDisabilitySavingsPlanAmount:number;

  constructor(){

  }

  get hasSpouseOrCommonLaw(){
    return this._hasSpouseOrCommonLaw;
  }

  set hasSpouseOrCommonLaw(arg:boolean){
    if(!arg){
      this.spouseEligibleForDisabilityCredit = arg;
      this.spouseNetIncome = null;
    }
    this._hasSpouseOrCommonLaw = arg;
  }

  get selfDisabilityCredit(){
    return this.eligibleForDisabilityCredit;
  }
  set selfDisabilityCredit(selfEligible:boolean){
    this.eligibleForDisabilityCredit = selfEligible;
  }

  get spouseEligibleForDisabilityCredit(){
    return this.spouseOrCommonLawEligibleForDisabilityCredit
  }

  set spouseEligibleForDisabilityCredit(spouseEligible:boolean) {
    if(spouseEligible){
      this._hasSpouseOrCommonLaw = true;
    }
    this.spouseOrCommonLawEligibleForDisabilityCredit = spouseEligible;
  }

  // Address and Contact Info
  public residentialAddress: Address = new Address();
  public mailingSameAsResidentialAddress: boolean = true;
  public mailingAddress: Address = new Address();
  public phoneNumber: string;
  public alternativePhoneNumber: string;
}
