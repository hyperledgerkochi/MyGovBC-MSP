import {
  MspApplication,
  MspPerson
} from 'app/modules/enrolment/models/application.model';
import { FinancialAssistApplication } from './financial-assist-application.model';
import { SimpleDate } from 'moh-common-lib';
import { AssistanceYear } from './assistance-year.model';
import { deepFlatten } from './assist-review-helpers';

export interface IApplicantInformation {
  years: number[];
  name: string;
  birthDate: string;
  phn: string;
  sin: string;
  appDocuments: string;
  // spouseDocuments: string;
  getData?: () => IApplicantInformation;
}

export class ApplicantInformation implements IApplicantInformation {
  years: number[];
  name: string;
  birthDate: string;
  phn: string;
  sin: string;
  appDocuments: string;
  // spouseDocuments: string;
  getData(): IApplicantInformation {
    return {
      years: this.years,
      name: this.name,
      birthDate: this.birthDate,
      sin: this.sin,
      phn: this.phn,
      appDocuments: this.appDocuments
    };
  }

  constructor(mspApp: FinancialAssistApplication) {
    const { ...app } = { ...mspApp };

    this.years = this.makeYears(app.assistYears);
    this.name = this.makeName(app.applicant);

    this.birthDate = this.makeDate(app.applicant.dateOfBirth);
    this.phn = app.applicant.previous_phn;
    this.sin = app.applicant.sin;
    const appDocuments = [];
    for (let year of app.assistYears) {
      let i = this.years.indexOf(year.year);
      if (i >= 0) {
        appDocuments.push(year.files);
      }
    }
    appDocuments.filter(itm => itm.length > 0);
    this.appDocuments = deepFlatten(appDocuments)
      .map(itm => itm.name)
      .reduce((a, b) => `${a}, ${b}`);

    console.log('files', this.appDocuments);
  }

  makeDate(date: SimpleDate) {
    return `${date.day}/${date.month}/${date.year}`;
  }

  makeYears(years: AssistanceYear[]) {
    return years.filter(year => year.apply).map(year => year.year);
  }

  makeName(app: MspPerson) {
    const { firstName, middleName, lastName } = { ...app };
    return [firstName, middleName, lastName]
      .filter(itm => itm)
      .reduce((a, b) => `${a} ${b}`);
  }
}