import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgClass, NgForOf} from "@angular/common";
import {PositionService} from "../../PositionTools/service/position.service";
import {ToastrService} from "ngx-toastr";
import {TaskService} from "../../TaskTools/service/task.service";
import {iconApp, manager, TaskScheduled, TaskScheduled2} from "../../../models/models";
import Swal from "sweetalert2";
import {NgxSpinnerComponent, NgxSpinnerService} from "ngx-spinner";
import {RepartitionService} from "../repartition/repartition.service";

@Component({
  selector: 'app-repartition-creation',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    ReactiveFormsModule,
    NgClass,
    NgxSpinnerComponent
  ],
  templateUrl: './repartition-creation.component.html',
  styleUrl: './repartition-creation.component.css'
})
export class RepartitionCreationComponent implements OnInit{
   protected view:  boolean = false;

   protected functions  : string[] = ["Coordinateur" , "Exécutant"];

  constructor(private servicePosition :PositionService ,
              private toastr : ToastrService ,
              private serviceTask : TaskService  , private service : RepartitionService  ) {

  }

  protected  repartition_1 =   new FormGroup({
      poste : new FormControl("", [Validators.required]),
  })

  protected   listPosition:  any[] = [];
  protected   listTaskScheduled : TaskScheduled2[] = [];
  protected   repartition_2 = new FormGroup({
    task : new FormControl('', [Validators.required]),
    employee: new FormControl('', [Validators.required]),
    date : new FormControl('', [Validators.required]),
    function : new FormControl('', [Validators.required]),
  });



  ngOnInit(): void {
    this.fetchPosition();
  }

  createRepartition() {
    console.log(this.repartition_2.value);
    this.service.createRepartition(this.repartition_2.value).subscribe(data =>{
        console.log(data);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Assignation effectué avec succès !",
        showConfirmButton: false,
        timer: 1500
      });
    } , err =>{
        console.log(err)
      if(err.error == "Wrong activity sector"){
        Swal.fire({
          position: "center",
          icon: "warning",
          title: " Le poste de cet employé ne lui permet pas   de participer à cette tache !",
          showConfirmButton: true,
          timer: 6000
        });
      }else if (err.error == "Employee not found"){
        Swal.fire({
          position: "center",
          icon: "warning",
          title: " Aucun Employé n'a cet identifiant !",
          showConfirmButton: true,
          timer: 6000
        });
      }
      else if(err.error == "employee already in  assignment"){
        Swal.fire({
          position: "center",
          icon: "warning",
          title: "  Cette employé est déjà assigné a cette tache !",
          showConfirmButton: true,
          timer: 6000
        });
      }

      else{
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Assignation effectué a echoué !",
          showConfirmButton: true,
          timer: 5000
        });
      }

    })
  }



  setRepartitionCreation() {

    this.serviceTask.searchTaskScheduledByPositionId(Number(this.repartition_1.value.poste)).subscribe(data => {
      this.listTaskScheduled= data ;

      console.log(data)
    } , error => {
        this.toastr.warning(iconApp+"Erreur de chargement au niveau des  taches planifiées" , manager , {enableHtml :true});
        console.log(error)
    })

  }


  fetchPosition(){
    this.servicePosition.allPositions().subscribe(data =>{
        this.listPosition = data ;
    } , error => {
      this.toastr.warning(iconApp+"Erreur de chargement au niveau des  taches planifiées" , manager , {enableHtml :true})
    })
  }

  changeView() {

    setTimeout(()=>{
      if(this.listTaskScheduled.length==0){
        Swal.fire({
          title: " Aucune tache consernant ce poste n 'a été planifiée !!",
          icon : "warning" ,
          showClass: {
            popup: `
      animate__animated
      animate__fadeInUp
      animate__faster
    `
          },
          hideClass: {
            popup: `
      animate__animated
      animate__fadeOutDown
      animate__faster
    `
          }
        });
      }else{
        this.view = !this.view
      }
    } , 500)
  }




}


/* */
