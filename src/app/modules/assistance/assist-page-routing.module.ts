import { Routes } from '@angular/router';
import { AssistancePrepareComponent } from './pages/prepare/prepare.component';
import { AssistancePersonalInfoComponent } from './pages/personal-info/personal-info.component';
import { AssistanceRetroYearsComponent } from './pages/retro-years/retro-years.component';
import { AssistanceReviewComponent } from './pages/review/review.component';
import { AssistanceAuthorizeSubmitComponent } from './pages/authorize-submit/authorize-submit.component';
import { AssistanceSendingComponent } from './pages/sending/sending.component';
import { AssistanceConfirmationComponent } from './pages/confirmation/confirmation.component';


export const assistPages: Routes = [
  {
    path: '',
    redirectTo: 'prepare',
    pathMatch: 'full'
  },
  {
    path: 'prepare',
    component: AssistancePrepareComponent
  },
  {
    path: 'personal-info',
    //canActivate: [ProcessService],
    component: AssistancePersonalInfoComponent,

  },
  {
    path: 'retro',
    //canActivate: [ProcessService],
    component: AssistanceRetroYearsComponent
  },
  {
    path: 'review',
   // canActivate: [ProcessService],
    component: AssistanceReviewComponent
  },
  {
    path: 'authorize-submit',
   // canActivate: [ProcessService],
    component: AssistanceAuthorizeSubmitComponent
  },
  {
    path: 'sending',
   // canActivate: [ProcessService],
    component: AssistanceSendingComponent
  },
  {
    path: 'confirmation',
    canActivate: [],
    component: AssistanceConfirmationComponent
  },
  {
    path: '',
    redirectTo: 'prepare'
  }
];