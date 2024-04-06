import { Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { RegistrationformComponent } from './registrationform/registrationform.component';
import { PatientListComponent } from './patient-list/patient-list.component';
import { ReportComponent } from './report/report.component';
import { VisitcreationComponent } from './visitcreation/visitcreation.component';


export const routes: Routes = [
    {path: '', component: HomepageComponent},
    {path: 'form', component: RegistrationformComponent},
    {path: 'patientlist', component: PatientListComponent},
    {path: 'report', component: ReportComponent},
    {path: 'purpose', component: VisitcreationComponent},
];
