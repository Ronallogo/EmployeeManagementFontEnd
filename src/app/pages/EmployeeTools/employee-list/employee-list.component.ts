import {Component, OnInit} from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {EmployeeService} from "../service/employee.service";
import {NgForOf, NgIf} from "@angular/common";
import {ToastrService} from "ngx-toastr";
import {EmployeeModel, EmployeeModel6, iconApp, manager} from "../../../models/models";
import {PayStubService} from "../../payStubTools/service/pay-stub.service";
import {ApplicationService} from "../../../globalService/appService/application.service";

@Component({
  selector: 'app-employee-list',
  standalone: true,
    imports: [
        NgForOf,
        RouterLink,
        RouterLinkActive,
        NgIf
    ],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent  implements OnInit{


  protected listEmployee : any[] =[];
  protected  idUser !: number ;
  protected header : string[] = ["No (ID)"  , "Photo", "Nom " ,"Prénom ","Date de naissance" ,"Email",  "Téléphone" , "Adresse" ,"Position" , "Actions" ]
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
          console.log(data)
      })
  }


  deleteEmployee(p : EmployeeModel6 ) {

    this.service.deleteEmployee(p.id).subscribe (data => {
      console.log(data);
      this.app.deleteUser(p.user.id).subscribe (data => {
        console.log(data);
        this.toastr.info(iconApp + " Toute les données de cet employés on été nettoyé!!!!" , manager , {enableHtml:true});
        this.toastr.success(iconApp + " suppression effectué!!!!" , manager , {enableHtml:true});
        window.location.reload();
      } , error => {
        console.log(error);
        this.toastr.warning(iconApp+" il y a encore des résidu de données de cet employé!!!!" , manager , {enableHtml:true})
      });


    } , error => {
      console.log(error);
      this.toastr.error(iconApp + " Erreur de suppression de l'employé !!" , manager , {enableHtml:true})
    })






    /*  this.payStubService.getPayStubForOne(String(p.email)).subscribe (data =>{
        console.log(data);
        this.payStubService.deletePayStub(data.id).subscribe(data =>{

        })
      } , error => {
        console.log(error);
        this.toastr.error(iconApp+" Erreur de Suppression du bulletin de paie !!!" , manager , {enableHtml:true});
      });*/









  }


  generePdf(){
    this.service.report().subscribe((data : Blob) => {
      console.log(data);
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
}
