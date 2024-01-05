import { NgModule } from '@angular/core';
import { bootstrapApplication, BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule} from "@angular/common/http"
import { MachineComponent } from './machine/machine.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { IncidentsComponent } from './incidents/incidents.component';
import { UsersComponent } from './users/users.component';
import { DeclarationsComponent } from './declarations/declarations.component';
import { FormsModule} from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { LoginComponent } from './login/login.component';


@NgModule({
  declarations: [
    AppComponent,
    MachineComponent,
    DashboardComponent,
    IncidentsComponent,
    UsersComponent,
    DeclarationsComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,FormsModule,NgbModule,DatePipe
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
