import {Component, OnInit} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {EmployeeService} from "../service/employee.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {EmployeeModel6, iconApp, manager} from "../../../models/models";
import Swal from "sweetalert2";
import {NgxPaginationModule} from "ngx-pagination";

@Component({
  selector: 'app-employee-search',
  standalone: true,
  imports: [
    NgForOf,
    RouterLink,
    RouterLinkActive,
    FormsModule,
    ReactiveFormsModule,
    NgIf,
    NgxPaginationModule
  ],
  templateUrl: './employee-search.component.html',
  styleUrl: './employee-search.component.css'
})
export class EmployeeSearchComponent implements OnInit{
  protected listEmployee : any[] =[];

  protected header : string[] = ["No" ,"Photo" , "Nom " ,"Prénom ","Date de naissance" ,"Email",  "Téléphone" , "Adresse" ,"Position" , "Actions" ]
  keyword!:  number ;
  currentPage: number = 1;


  constructor(protected service : EmployeeService , private toastr : ToastrService){}
  ngOnInit(): void {
  }


  search(key:  number){
    this.listEmployee = [];
    this.keyword = key;
    if(this.keyword == null ){
      this.toastr.warning(iconApp + "Veuillez saisir l'identifiant de  l'employé!!" , manager , {enableHtml:true});
      return;
    }
    this.service.searchEmployeeById(key).subscribe(data =>{

      if(data != null) this.listEmployee.push(data) ;
      if(data == null) this.toastr.warning(iconApp + " Aucun employé  ne possède cet identifiant  !!" , manager , {enableHtml:true});
    } , error => {
      if(error.message == "Http failure response for http://127.0.0.1:8080/api/auth/employee_manager/employee/searchById/undefined: 500 OK"){
        this.toastr.warning(iconApp + "  Veuillez saisir l'identifiant de l'employé !!" , manager , {enableHtml:true});
      }
      else{
        this.toastr.error(iconApp + " Une erreur est survenue !!" , manager , {enableHtml:true});
      }


    })
  }

  deleteEmployee(p : EmployeeModel6 ) {

    Swal.fire({
      title: "Voulez vous supprimé l'employé @"+p.name +" ?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#94ec8f",
      cancelButtonColor: "#e62b2b",
      confirmButtonText: "Supprimer" ,
      cancelButtonText: "annuler" ,
      backdrop: `
    rgba(0,0,0,0.4)
    left top
    no-repeat
  ` ,
      showClass: {
        popup: `
      animate__animated
      animate__fadeInUp

    `
      },
      hideClass: {
        popup: `
      animate__animated
      animate__fadeOutDown
      animate__faster
    `
      }

    }).then((result) => {
      if (result.isConfirmed) {
        this.service.deleteEmployee(p.id).subscribe (data => {
          this.service.searchEmployeeById(this.keyword).subscribe(data =>{
            this.listEmployee = []
            if(data != null)  this.listEmployee.push(data) ;
            else  this.toastr.info(iconApp + "  Plus aucun employé ne correspond a cet identifiant !!!"  ,manager , {enableHtml : true})
          })
        })

      }

    });





  }


  getImageUrl(photo: any) {
    return `data:image/jpg;base64,${photo}`;
  }

  pageChanged($event: number) {
    this.currentPage = $event

  }
}
