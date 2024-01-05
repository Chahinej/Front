import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DeclarationsComponent } from './declarations/declarations.component';
import { IncidentsComponent } from './incidents/incidents.component';
import { LoginComponent } from './login/login.component';
import { MachineComponent } from './machine/machine.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [

 /* {path:'login',component:LoginComponent},
  {path:'dashboard',component:DashboardComponent,
        children:[
          {path:'machines',component:MachineComponent},
          {path:'incidents',component:IncidentsComponent},
          {path:'declarations',component:DeclarationsComponent},
          {path:'users',component:UsersComponent}
                ]}*/
                {path:'dashboard',component:DashboardComponent},
                {path:'machines',component:MachineComponent},
                {path:'incidents',component:IncidentsComponent},
                {path:'declarations',component:DeclarationsComponent},
                {path:'users',component:UsersComponent}

  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
