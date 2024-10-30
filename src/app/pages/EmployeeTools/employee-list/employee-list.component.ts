import {Component, OnInit} from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {EmployeeService} from "../service/employee.service";
import {NgForOf, NgIf} from "@angular/common";
import {ToastrService} from "ngx-toastr";
import {EmployeeModel, EmployeeModel6, iconApp, manager} from "../../../models/models";
import {PayStubService} from "../../payStubTools/service/pay-stub.service";
import {ApplicationService} from "../../../globalService/appService/application.service";
import Swal from "sweetalert2";
import {NgxPaginationModule} from "ngx-pagination";

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [
    NgForOf,
    RouterLink,
    RouterLinkActive,
    NgIf,
    NgxPaginationModule
  ],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent  implements OnInit{


  protected listEmployee : any[] =[];
  protected visible = true ;

  protected header : string[] = ["No (ID)"  , "Photo", "Nom " ,"Prénom ","Date de naissance" ,"Email",  "Téléphone" , "Adresse" ,"Position" , "Actions" ]
  protected currentPage: number = 1;

  constructor(
    protected service : EmployeeService ,
    private  toastr : ToastrService ,
    private payStubService : PayStubService ,
    private app : ApplicationService
    ) {}

  ngOnInit(): void {
      this.getAllEmployee() ;
  }

     getAllEmployee(){
      this.service.allEmployees().subscribe(data =>{
          this.listEmployee = data ;

      })
  }


  deleteEmployee(p : EmployeeModel6 ) {

    Swal.fire({
      title: "Voulez vous supprimé l'employé @"+p.name +" ?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#9fec9a",
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

          this.app.deleteUser(p.user.id).subscribe (data => {

            this.toastr.info(iconApp + " Toute les données de cet employés on été nettoyé!!!!" , manager , {enableHtml:true});
            this.toastr.success(iconApp + " suppression effectué!!!!" , manager , {enableHtml:true});
            this.getAllEmployee();


          } , error => {
            console.log(error);
            this.toastr.warning(iconApp+" il y a encore des résidu de données de cet employé!!!!" , manager , {enableHtml:true})
          });


        } , error => {
          console.log(error);
          this.toastr.error(iconApp + " Erreur de suppression de l'employé !!" , manager , {enableHtml:true})
        })
      }

    });





  }


  generePdf(){
    this.service.report().subscribe((data : Blob) => {

      const blob = new Blob([data], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'liste_employés.pdf';
      a.click();
      URL.revokeObjectURL(url);
      this.toastr.success(iconApp+" génération réussie !! \n"+data , manager , {enableHtml:true} );
    } , error => {
      this.toastr.error(iconApp +" Erreur de génération!!!!" , manager , {enableHtml:true});
      console.log(error)
    })
  }

  getImageUrl(photo: any) {
    return `data:image/jpg;base64,${photo}`;
  }

  protected readonly EmployeeService = EmployeeService;


  pageChanged($event: number) {
    this.currentPage = $event ;
  }

}
