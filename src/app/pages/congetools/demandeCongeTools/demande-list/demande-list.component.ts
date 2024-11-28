import {Component, OnInit} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {
  CongeModel,
  CongeModel2,
  DemandeConge,
  DemandeConge2,
  EmployeeModel,
  iconApp,
  manager,
  TaskScheduled2
} from "../../../../models/models";
import {EmployeeService} from "../../../EmployeeTools/service/employee.service";
import {TaskService} from "../../../TaskTools/service/task.service";
import {ToastrService} from "ngx-toastr";
import {CongeService} from "../../service/conge.service";
import {NgxPaginationModule} from "ngx-pagination";
import Swal from "sweetalert2";

@Component({
  selector: 'app-demande-list',
  standalone: true,
  imports: [
    NgForOf,
    RouterLink,
    RouterLinkActive,
    NgIf,
    NgxPaginationModule
  ],
  templateUrl: './demande-list.component.html',
  styleUrl: './demande-list.component.css'
})
export class DemandeListComponent  implements OnInit{
  protected listConge : DemandeConge[] =  [];

  protected  congeData !: CongeModel2   ;
  protected header : string[] = ["No" , "début de congé" , "fin de congé" , "type de congé" , "status" , "demande de" , "actions"]
  private currentPage:  number = 1 ;

  constructor(protected service : CongeService   , private toastr : ToastrService ) { }


  ngOnInit(): void {
    this.allDemandeConge();
  }


  deleteDemandeConge(id : number) {



    Swal.fire({
      title: "Voulez vous rejeter cette demande de congé ?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#9fec9a",
      cancelButtonColor: "#e62b2b",
      confirmButtonText: "oui" ,
      cancelButtonText: "non" ,
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

        this.service.deleteDemandeConge(id).subscribe(data =>{
          this.allDemandeConge() ;
          this.toastr.success("Cette demande de congé a été supprimée avec succès !!!")
        },error => {
          console.log(error);
          this.toastr.error(iconApp + " Erreur de suppression", manager , {enableHtml:true});
        })
      }

    });



  }

  allDemandeConge(){
    this.service.allDemandeConges().subscribe(data =>{

      this.listConge = data;
    } , error => {
      console.log(error);
      this.toastr.error(iconApp+ " Une erreur est survenue  !!" , manager , {enableHtml:true});

    })
  }

  validate(demande : DemandeConge){

      demande.validate = true

      let data : DemandeConge2 = {
          beginning : demande.beginning ,
          end : demande.end ,
         apply : demande.apply,
          employee : demande.employee.id,
          type :demande.type,
         validate : demande.validate,
      }



      this.service.updateDemandeConge(demande.id  , data).subscribe(data =>{

          this.toastr.success(iconApp+" Congé validé" , manager  , {enableHtml : true});
          this.congeData = {
            beginning : data.beginning ,
            end : data.end ,
            type :data.type,
            status : data.validate,
            timeOffApply : data.id,
        }
        this.service.createConge(this.congeData).subscribe(data =>{

              let employee : string = data.timeOffApply.employee.name
              this.toastr.info(iconApp+`Mr/Mme ${employee} a maintenant un  congé!!`,manager  , {enableHtml : true});
        } , error => {
              console.log(error);
              this.toastr.error(iconApp+ " Erreur d'attribution de congé !!" , manager  , {enableHtml : true});
        })

      } ,error => {
          console.log(error);
          this.toastr.error(iconApp+" Erreur de validation" , manager , {enableHtml:true});
      })
  }


  generePdf(){
    this.service.report2().subscribe((data : Blob) => {

      const blob = new Blob([data], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'liste_demande_congé.pdf';
      a.click();
      URL.revokeObjectURL(url);
      this.toastr.success(iconApp+" génération réussie !! \n"+data , manager , {enableHtml:true} );
    } , error => {
      this.toastr.error(iconApp +" Erreur de génération!!!!" , manager , {enableHtml:true});
      console.log(error)
    })
  }

  pageChanged($event: number) {
    this.currentPage = $event ;
  }
}
