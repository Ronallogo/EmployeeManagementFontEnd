import {Component, OnInit} from '@angular/core';
import {EmployeeService} from "../../../EmployeeTools/service/employee.service";
import {TaskService} from "../../../TaskTools/service/task.service";
import {
  ContenuModel,
  EmployeeModel,
  EmployeeModel2,
  iconApp,
  manager,
  TaskInsertedModel2, TaskScheduled, TaskScheduled2
} from "../../../../models/models";
import {ToastrService} from "ngx-toastr";
import {ContenuService} from "../../../contenuTools/service/contenu.service";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";

@Component({
  selector: 'app-user-task',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    ReactiveFormsModule,
    FormsModule,
    NgClass
  ],
  templateUrl: './user-task.component.html',
  styleUrl: './user-task.component.css'
})
export class UserTaskComponent implements OnInit{
  protected ListTaskInserted!: TaskInsertedModel2[];
  protected listContent !: ContenuModel[] ;
  private user = JSON.parse(String(localStorage.getItem("user")));
  private employee!: EmployeeModel;

  protected taskScheduled  = new FormGroup( {
    taskInserted : new FormControl("" ,Validators.required),
    employee : new FormControl(),
    beginning : new FormControl("" , Validators.required),
    end :new FormControl("" , Validators.required),
    status :new  FormControl(),
    content : new  FormControl("" , Validators.required),
  });







  constructor(
    private employeeService: EmployeeService ,
    private service : TaskService ,
    private serviceContent : ContenuService ,
    private toastr : ToastrService ,
  )  {}
  ngOnInit(): void {
    this.getAllData();
  }

  getAllData() {
    this.employeeService.getEmployeeByEmail(this.user.email).subscribe(data =>{
      console.log(data);
      this.employee = data;
      console.log(this.employee);

      this.service.getAllTaskForOnePosition(this.employee.position.id).subscribe(data =>{
        console.log(data);
        this.ListTaskInserted = data
      } , error => {
        this.toastr.warning(iconApp+' les task insérées du système' +
          ' non pas été chargé pour la création de contenu' , manager , {enableHtml:true});
      })


    } , error => {
      console.log(error);
      this.toastr.warning(iconApp+ "il semble avoir un problème avec la récupération de vos données ." , manager , {enableHtml:true})
    });


     this.serviceContent.allContenu().subscribe(data =>{
       console.log(data);
       this.listContent = data ;

     } , error => {
       console.log(error);
       this.toastr.warning(iconApp+' les contenu non pas été chargé pour la création de contenu' , manager , {enableHtml:true});
     });






  }

  createTaskScheduled() {

      console.log(this.taskScheduled.value);

      this.service.createTaskScheduled(
        {
            taskInserted : this.taskScheduled.value.taskInserted,
            content : this.taskScheduled.value.content,
            beginning :  String(this.taskScheduled.value.beginning) ,
            end :  String(this.taskScheduled.value.end),
            employee : this.employee.id,
            status :false
        }

      ).subscribe(data =>{
          console.log(data);
          this.toastr.success(iconApp+" Cette tache est désormais en cours ...bon travail!!" ,manager , {enableHtml:true});
      } , error => {
        console.log(error);
        this.toastr.error(iconApp+" Une erreur c est produite !! Vérifier que la chronologie des dates soit correcte !!" ,manager , {enableHtml:true});
      })
  }
}
