import { NgModule } from '@angular/core';
import {Route, RouterModule} from "@angular/router";
import { RegistrationComponent } from './registration/registration.component';


const routes : Route[] = [
    {path:'', component: RegistrationComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class RegisterRoutingModule { }
