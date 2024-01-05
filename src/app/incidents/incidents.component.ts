import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Incident } from '../Model/Incident';
import { IncidentService } from '../services/incident.service';
declare var window:any

@Component({
  selector: 'app-incidents',
  templateUrl: './incidents.component.html',
  styleUrls: ['./incidents.component.css']
})
export class IncidentsComponent implements OnInit {
  public incidents :any;
  public static Incident_clicked:number;
  addmodal :any ;
  editmodal:any;
  modal :any ;
  editIncident:any="";
  constructor(private incidentService:IncidentService,private modalservice:NgbModal) { }


  ngOnInit(): void {
    this.OnGetIncidents();
    //delete modal
this.modal = new window.bootstrap.Modal(
  document.getElementById('exampleModal'));
 //edit modal
 this.editmodal = new window.bootstrap.Modal(
  document.getElementById('editModal'));
//add modal
this.addmodal=new window.bootstrap.Modal(
  document.getElementById('addModal'));
  }

  OnGetIncidents(){
    this.incidentService.getIncidents().subscribe(data=>{
      this.incidents = data;
    },err=>{
      console.log(err);
    });
  }

  //delete modal
  openDeleteModel(id:number):void
  {
    IncidentsComponent.Incident_clicked=id;
      this.modal.show();
  }
  ConfirmDelete(){
    this.incidentService.deleteIncident(IncidentsComponent.Incident_clicked).subscribe((response:void)=>{

      this.OnGetIncidents();

        this.modal.hide();

    },
    function (error: HttpErrorResponse) {
        alert(error.message);
      }
    );
  }
  hide()
  {
    this.modal.hide()
  }

  //new
  //add modal
openAddModel()
{

  this.addmodal.show();
}
addmodalhide(){
  this.addmodal.hide();
}
onAddIncident(addForm:NgForm) :void
{
 let incident:Incident = addForm.value;
 if(incident.state)
 {
  incident.state="active";
 }else
 {
  incident.state="disabled";
 }
this.incidentService.addIncident(incident).subscribe((
  response: Incident)=>{
    console.log(response);
    this.OnGetIncidents();
    this.modal.addmodalhide();
  },(error:HttpErrorResponse) =>
  {
    alert(error.message);
  }
);
}
//edit modal
openEditIncident(incident:Incident)
{
this.editIncident=incident;
this.editmodal.show();
}
onEditIncident(incident:Incident)
{
  if(incident.state)
  {
    incident.state="Confirmed";
  }else
  {
    incident.state="Not Confirmed";
  }
 this.incidentService.updateIncident(incident).subscribe((
   response: Incident)=>{
     console.log(response);
     this.OnGetIncidents();
     this.editmodalhide();
   },(error:HttpErrorResponse) =>
   {
     alert(error.message);
   }
 );
}
editmodalhide(){
  this.editmodal.hide();
}
}
