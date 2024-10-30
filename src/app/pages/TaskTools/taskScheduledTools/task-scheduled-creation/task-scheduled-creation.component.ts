import {Component, OnInit} from '@angular/core';
import {EmployeeService} from "../../../EmployeeTools/service/employee.service";
import {TaskService} from "../../service/task.service";
import {
  ContenuModel,
  EmployeeModel,
  EmployeeModel2,
  iconApp,
  manager, PositionModel,
  TaskInsertedModel2, TaskScheduled, TaskScheduled2
} from "../../../../models/models";
import {ToastrService} from "ngx-toastr";
import {ContenuService} from "../../../contenuTools/service/contenu.service";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import Swal from "sweetalert2";
import {RouterLink} from "@angular/router";
import {PositionService} from "../../../PositionTools/service/position.service";

@Component({
  selector: 'app-task-scheduled-creation',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    ReactiveFormsModule,
    FormsModule,
    NgClass,
    RouterLink
  ],
  templateUrl: './task-scheduled-creation.component.html',
  styleUrl: './task-scheduled-creation.component.css'
})
export class TaskScheduledCreationComponent implements OnInit{
  protected ListTaskInserted!: TaskInsertedModel2[];
  protected listContent !: ContenuModel[] ;
  protected listPosition !: PositionModel[] ;
  protected listType  = ["Individuelle" , "Collective"] ;

  protected  view : boolean = false;



  protected taskScheduled_1  = new FormGroup( {
    position : new FormControl("" ,Validators.required),
    type : new FormControl("" , Validators.required),
  });
  protected taskScheduled_2  = new FormGroup( {
    taskInserted : new FormControl("" ,Validators.required),
    beginning : new FormControl("" , Validators.required),
    end :new FormControl("" , Validators.required),
    status :new  FormControl(),
    content : new  FormControl("" , Validators.required),
    nbrPerson : new FormControl(),
  });








  constructor(
    private employeeService: EmployeeService ,
    private service : TaskService ,
    private serviceContent : ContenuService ,
    private serviceTask : TaskService ,
    private servicePosition : PositionService ,
    private toastr : ToastrService ,
  )  {}


  ngOnInit(): void {
    this.getAllData();
  }

  getAllData() {


     this.serviceContent.allContenu().subscribe(data =>{
       this.listContent = data ;

     } , error => {
       console.log(error);
       this.toastr.warning(iconApp+' les contenu non pas été chargé pour la création de contenu' , manager , {enableHtml:true});
     });

     this.servicePosition.allPositions().subscribe(data =>{
       this.listPosition = data ;
     }, err =>{
        this.toastr.warning(iconApp+" Une erreur c est produite au niveau de la récuperation des poste!!" ,manager , {enableHtml:true});
     })


  }

  createTaskScheduled() {



      this.service.createTaskScheduled(
        {
            taskInserted :String(this.taskScheduled_2.value.taskInserted),
            content : String(this.taskScheduled_2.value.content),
            beginning :  String(this.taskScheduled_2.value.beginning) ,
            end :  String(this.taskScheduled_2.value.end),
            status :false ,
            type : this.taskScheduled_1.value.type ,
            nbrPerson : (this.taskScheduled_1.value.type == "Individuelle")? 1 : String(this.taskScheduled_2.value.nbrPerson)
        }

      ).subscribe(data =>{
          console.log(data);
          this.toastr.success(iconApp+" Cette tache est désormais en cours ...bon travail!!" ,manager , {enableHtml:true});
      } , error => {
        console.log(error);
        this.toastr.warning(iconApp+" Une erreur c est produite !! Vérifier que la chronologie des dates soit correcte !!" ,manager , {enableHtml:true});
      })
  }

  changeView(){this.view = !this.view}

  fetchTask(){
    this.view = !this.view;
    this.serviceTask.allTasksInsertedForOnePosition(Number(this.taskScheduled_1.value.position)).subscribe(data =>{
        this.ListTaskInserted = data ;
    } , error => {
      this.toastr.warning(iconApp+" Une erreur c est produite  au niveau de la recuperation des taches !!" ,manager , {enableHtml:true});
    })

  }
}
