import {Component, OnInit} from '@angular/core';
import {EmployeeService} from "../../../EmployeeTools/service/employee.service";
import {TaskService} from "../../../TaskTools/service/task.service";
import {
  ContenuModel,
  EmployeeModel,
  EmployeeModel2,
  iconApp,
  manager,
  TaskInsertedModel2
} from "../../../../models/models";
import {ToastrService} from "ngx-toastr";
import {ContenuService} from "../../../contenuTools/service/contenu.service";

@Component({
  selector: 'app-user-task',
  standalone: true,
  imports: [],
  templateUrl: './user-task.component.html',
  styleUrl: './user-task.component.css'
})
export class UserTaskComponent implements OnInit{
  protected ListTaskInserted!: TaskInsertedModel2[];
  protected listContent !: ContenuModel[] ;
  private user = JSON.parse(String(localStorage.getItem("user")));
  private employee!: EmployeeModel;




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

    } , error => {
      console.log(error);
      this.toastr.warning(iconApp+ "il semble avoir un problème avec la récupération de vos données ." , manager , {enableHtml:true})
    });
     this.serviceContent.allContenu().subscribe(data =>{
       console.log(data);
       this.listContent = data ;
     } , error => {
       console.log(error);
       this.toastr.warning(iconApp+' les contenu non pas été chargé pour la création de contenu' , manager);
     });
     this.service.allTasksInserted().subscribe(data =>{
       console.log(data);
       this.ListTaskInserted = data
     } , error => {
       this.toastr.warning(iconApp+' les task insérées du système' +
         ' non pas été chargé pour la création de contenu' , manager);
     })





  }

}
