export class History {
    conditionListed: string;
    conditionHistory: string;
    livingArrangement: string;
    workHistory: string;

    showConditionHistory: boolean;
    showlivingArrangement: boolean;
    showWorkHistory: boolean;

    MedicationListed: string;
    SideEffect: string;
    HandDominance:number;
   // conditionHistory: ConditionHistory  = new ConditionHistory();
    socialHistory: SocialHistory = new SocialHistory();
    occupationHistory: OccupationHistory = new OccupationHistory();
  }
  
export class ConditionHistory {
    onsetDate: Date;
    Specialists: string;
    Operations: string;
    Worsening: string;
  }
  
export class SocialHistory {
    type: string;
    liveWith: string;
  }
  
export class OccupationHistory {
    previousOccupation: string;
    whyStoped: string;
    whenStopped: Date;
  }