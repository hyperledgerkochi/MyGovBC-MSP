export class Question {
    DepressionDiagnosed: Date;
    IsCurrentlyOnMedication: boolean;
    DrugsandDosages: string;
    GpAboutDepression: boolean;
    HowOften: string;
    IsGPAware: boolean;
    AnyoneAboutDepression: boolean;
    Name: string;
    JobTitle: string;
    Phone: string;
    Address: string;
    LastAppointment: Date;
    FurtherAppointment: boolean;
    AdmittedToHospital: boolean;
    whenAdmitted: string;
    hospitalname: string;
    AdmissionVoluntary: boolean;
    Sectioned: boolean;
    HowLongSectioned: number;
    RequiredHospitalFollowup: boolean;
    SelfHarmed: boolean;
    LastTimeSelfHarmed: Date;
    OngoingSituation: boolean;
    AnyHealthcareInvolved: boolean;
    ConsentToInformingGP: boolean;
    supportProvided: string;

    // variable to show the block after the user clicks on Continue 
    showGPDepression: boolean;
    showAdmissionVoulntary: boolean;
    showAdmittedtoHospital: boolean;
    showHospitalName: boolean;

    
  }