import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DeclarationService } from '../services/declaration.service';
import {ModalDismissReasons,NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import { Declaration } from '../Model/Declaration';

declare var window:any

@Component({
  selector: 'app-declarations',
  templateUrl: './declarations.component.html',
  styleUrls: ['./declarations.component.css']
})
export class DeclarationsComponent implements OnInit {
  public declarations :any;
  public static declaration_clicked:number;
  addmodal :any ;
editmodal:any;
modal :any ;
 editDeclaration:any="";

  constructor(private declarationService:DeclarationService,private modalservice:NgbModal) {
  }

  ngOnInit(): void {
    this.OnGetDeclarations();
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
  OnGetDeclarations(){
    this.declarationService.getDeclarations().subscribe(data=>{
      this.declarations = data;
    },err=>{
      console.log(err);
    });
  }

  //delete modal
  openDeleteModel(id:number):void
  {
    DeclarationsComponent.declaration_clicked=id;
      this.modal.show();
  }
  ConfirmDelete(){
    this.declarationService.deleteDeclaration(DeclarationsComponent.declaration_clicked).subscribe((response:void)=>{

      this.OnGetDeclarations();

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
onAddDeclaration(addForm:NgForm) :void
{
 let declaration:Declaration = addForm.value;
 if(declaration.status)
 {
  declaration.status="Confirmed";
 }else
 {
  declaration.status="Not Confirmed";
 }
this.declarationService.addDeclaration(declaration).subscribe((
  response: Declaration)=>{
    console.log(response);
    this.OnGetDeclarations();
    this.modal.addmodalhide();
  },(error:HttpErrorResponse) =>
  {
    alert(error.message);
  }
);
}
//edit modal
openEditDeclaration(declaration:Declaration)
{
this.editDeclaration=declaration;
this.editmodal.show();
}
onEditDeclaration(Declaration:Declaration)
{
  if(Declaration.status)
  {
    Declaration.status="Confirmed";
  }else
  {
    Declaration.status="Not Confirmed";
  }
 this.declarationService.updateDeclaration(Declaration).subscribe((
   response: Declaration)=>{
     console.log(response);
     this.OnGetDeclarations();
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
