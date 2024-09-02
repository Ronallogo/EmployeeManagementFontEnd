import {Component, OnInit} from '@angular/core';
import {DemandeConge, DemandeConge2, iconApp, manager} from "../../../../models/models";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgForOf} from "@angular/common";
import {UserSettingService} from "../../service/user-setting.service";
import {EmployeeService} from "../../../EmployeeTools/service/employee.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-user-demande-conge',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgForOf
  ],
  templateUrl: './user-demande-conge.component.html',
  styleUrl: './user-demande-conge.component.css'
})
export class UserDemandeCongeComponent implements  OnInit{
  protected demandeConge : DemandeConge2 = {
    beginning : "" ,
    end : "" ,
    type : "" ,
    employee  : 0 ,
    validate : false ,
    apply : ""

}   ;


  protected  type : string[] = [
    "Congé payé",
    "Congé maladie",
    "Congé maternité",
    "Congé paternité",
    "Congé parental",
    "Congé pour événement familial",
    "Congé sabbatique",
    "Congé pour études",
    "Congé pour raison personnelle",
    "Congé de bénévolat" ,
    "Autres"
  ];
   private email : string = "";


  constructor(private  service : UserSettingService , private employeeService : EmployeeService , private toastr : ToastrService) {
  }

  ngOnInit(): void {
    console.log(this.type);
    this.email = JSON.parse(String(localStorage.getItem("user"))).email;
    this.getEmployee()

  }

  createDemande(){

        console.log(this.demandeConge.type)
        this.service.createDemandeConge(this.demandeConge).subscribe(data =>{
            console.log(data);
            this.toastr.success(iconApp + " Demande envoyé !!" , manager , {enableHtml : true});

        } , error => {
          console.log(error);
          this.toastr.error(iconApp + " Demande non envoyé !!" , manager , {enableHtml:true})
        })
  }


  getEmployee(){


      this.employeeService.getEmployeeByEmail(this.email).subscribe(data =>{
        console.log(data)
        this.demandeConge.employee  = data.id;
        console.log(this.demandeConge.employee)
      } , error => {
        console.log(error);
      })
  }





}
