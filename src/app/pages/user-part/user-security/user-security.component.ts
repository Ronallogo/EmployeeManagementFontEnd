import {Component, OnInit} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgForOf} from "@angular/common";
import {iconApp, manager, UserDetails} from "../../../models/models";
import {ApplicationService} from "../../../globalService/appService/application.service";
import {ToastrService} from "ngx-toastr";
import {EmployeeService} from "../../EmployeeTools/service/employee.service";

@Component({
  selector: 'app-user-security',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    ReactiveFormsModule
  ],
  templateUrl: './user-security.component.html',
  styleUrl: './user-security.component.css'
})
export class UserSecurityComponent implements   OnInit{
  user !: UserDetails ;
  private  id : number  = 0 ;
  private email : string = JSON.parse(String(localStorage.getItem('user'))).email;


  constructor(
    private appService : ApplicationService ,
    private toastr : ToastrService ,
    private  employeeService  : EmployeeService ,
    ) {}


  ngOnInit(): void {
      this.getDataUser();
  }

  getDataUser(){
      this.appService.fetchUser(this.email).subscribe(data =>{
          this.user = data;
          this.id = data.id;
          console.log(this.user);
          this.toastr.info(iconApp + " données chargées !" , manager , {enableHtml :true})
      } , error => {
          console.log(error);
          this.toastr.warning(iconApp + " Erreur de chargement !" , manager , {enableHtml:true})
      })
  }


  updateUser() {
      this.appService.updateUserWithPassword(this.id ,this.user).subscribe(data =>{
          console.log(data);
          let dataUserPermission =  JSON.parse(String(localStorage.getItem('user')));
          dataUserPermission.email =  this.user.email;
          dataUserPermission.role =  this.user.role;
          console.log(dataUserPermission);
          localStorage.setItem('user', JSON.stringify(dataUserPermission));


        this.toastr.success(iconApp + " mise à jour des données de sécurité effectuer!!!" , manager ,{enableHtml:true});
      }  ,error => {
        console.log(error);
        this.toastr.error(iconApp + " Erreur de chargement !" , manager , {enableHtml:true});
      })
  }
}
