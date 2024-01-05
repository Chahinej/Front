import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {  NgForm } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from '../Model/User';
import { UserService } from '../services/user.service';
declare var window:any

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  declare public Users :User[];
  public static user_clicked:number;
  modal :any ;
  addmodal :any ;
editmodal:any;
 editUser:any="";
declare addUser:User;
  constructor(private userService:UserService,private modalservice:NgbModal) { }
addFormConfirm = {
  id:0,
  firstname :'',
  lastname :'',
  password :'',
  username :'',
  phone :0,
  email :'',

}

  ngOnInit(): void {
this.OnGetUsers();
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
  OnGetUsers(){
    this.userService.getUsers().subscribe(data=>{
    this.Users=data;
    console.log(this.Users);
  },err=>{
    console.log(err);

  });
    }
//delete modal
openDeleteModel(id:number):void
{
  UsersComponent.user_clicked=id;
    this.modal.show();
}
ConfirmDelete(){
  this.userService.deleteUser(UsersComponent.user_clicked).subscribe((response:void)=>{

    this.OnGetUsers();

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
  onAddUser(addForm:NgForm) :void
  {
if(addForm.value['confirmpassword']==addForm.value['password'])
{
  this.addFormConfirm.username=addForm.value['username'];
  this.addFormConfirm.password=addForm.value['password'];
  this.addFormConfirm.email=addForm.value['email'];
  this.addFormConfirm.phone=addForm.value['phone'];
  this.addFormConfirm.firstname=addForm.value['firstname'];
  this.addFormConfirm.lastname=addForm.value['lastname'];
  console.log(this.addFormConfirm);
  this.userService.addUser(this.addFormConfirm).subscribe((
    response: User)=>{
      console.log(response);
      this.OnGetUsers();
      this.modal.addmodalhide();
    },(error:HttpErrorResponse) =>
    {
      alert(error.message);
    }
  );
 // console.log(this.addUser.username);
}
else
{
  console.log(addForm.value['password']);
}

}




  //edit modal
  openEditUser(user:User)
  {
  this.editUser=user;
  this.editmodal.show();
  }
  onEditUser(User:User)
  {

   this.userService.updateUser(User).subscribe((
     response: User)=>{
       console.log(response);
       this.OnGetUsers();
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
