import {Component, OnInit} from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {EmployeeService} from "../service/employee.service";
import {NgForOf} from "@angular/common";
import {ToastrService} from "ngx-toastr";
import {EmployeeModel, iconApp, manager} from "../../../models/models";
import {PayStubService} from "../../payStubTools/service/pay-stub.service";

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [
    NgForOf,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent  implements OnInit{


  protected listEmployee : any[] =[];

  protected header : string[] = ["No" , "Nom " ,"Prénom ","Date de naissance" ,"Email",  "Téléphone" , "Adresse" ,"Position" , "Actions" ]
  constructor(
    protected service : EmployeeService ,
    private  toastr : ToastrService ,
    private payStubService : PayStubService
    ) {}

  ngOnInit(): void {
      this.getAllEmployee() ;
  }

  getAllEmployee(){
      this.service.allEmployees().subscribe(data =>{
          this.listEmployee = data ;
          console.log(data)
      })
  }


  deleteEmployee(p : EmployeeModel ) {
    this.payStubService.getPayStubForOne(String(p.email)).subscribe (data =>{
      console.log(data);
      this.payStubService.deletePayStub(data.id).subscribe(data =>{
        this.service.deleteEmployee(p.id).subscribe (data => {
          console.log(data);
          window.location.reload();
          this.toastr.success(iconApp + " suppression effectué!!!!" , manager , {enableHtml:true})

        } , error => {
          console.log(error);
          this.toastr.error(iconApp + " Erreur de suppression de l'employé !!" , manager , {enableHtml:true})
        })

      })
    } , error => {
      console.log(error);
      this.toastr.error(iconApp+" Erreur de Suppression du bulletin de paie !!!" , manager , {enableHtml:true});
    })





  }
}
