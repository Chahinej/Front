import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Machine } from '../Model/machine';
import { MachineService } from '../services/machine.service';
import {ModalDismissReasons,NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';


declare var window:any

@Component({
  selector: 'app-machine',
  templateUrl: './machine.component.html',
  styleUrls: ['./machine.component.css']
})
export class MachineComponent implements OnInit {
public machines :any;
modal :any ;
addmodal :any ;
editmodal:any;
 editmachine:any="";

public static machine_id_clicked:number ;
  constructor(private machineService:MachineService ,private modalservice:NgbModal) { }



  ngOnInit(): void {

this.OnGetMachines();
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



  OnGetMachines(){
this.machineService.getMachines().subscribe(data=>{
  this.machines=data;
},err=>{
  console.log(err);

});
  }
  //delete modal
  openDeleteModel(id:number):void
  {
    MachineComponent.machine_id_clicked=id;
      this.modal.show();
  }
  ConfirmDelete(){
    this.machineService.deleteMachine(MachineComponent.machine_id_clicked).subscribe((response:void)=>{

      this.OnGetMachines();

        this.modal.hide();

    },
    function (error: HttpErrorResponse) {
        alert(error.message);
      }
    );
  }
  hide()
  {
    this.modal.hide();
  }

//add modal
openAddModel()
{

  this.addmodal.show();
}
addmodalhide(){
  this.addmodal.hide();
}
onAddMachine(addForm:NgForm) :void
{
 let machine:Machine = addForm.value;
 if(machine.state)
 {
  machine.state="active";
 }else
 {
  machine.state="disabled";
 }
this.machineService.addMachine(machine).subscribe((
  response: Machine)=>{
    console.log(response);
    this.OnGetMachines();
    this.modal.addmodalhide();
  },(error:HttpErrorResponse) =>
  {
    alert(error.message);
  }
);
}
//edit modal
openEditMachine(machine:Machine)
{
this.editmachine=machine;
this.editmodal.show();
}
onEditMachine(machine:Machine)
{
  if(machine.state)
  {
   machine.state="active";
  }else
  {
   machine.state="disabled";
  }
 this.machineService.updateMachine(machine).subscribe((
   response: Machine)=>{
     console.log(response);
     this.OnGetMachines();
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
