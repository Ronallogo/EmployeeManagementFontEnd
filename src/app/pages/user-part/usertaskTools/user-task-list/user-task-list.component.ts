import {Component, OnInit} from '@angular/core';
import {EmployeeModel, iconApp, manager, TaskScheduled, TaskScheduled2} from "../../../../models/models";
import {EmployeeService} from "../../../EmployeeTools/service/employee.service";
import {TaskService} from "../../../TaskTools/service/task.service";
import {ToastrService} from "ngx-toastr";
import {NgForOf} from "@angular/common";
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {timeout} from "rxjs";

@Component({
  selector: 'app-user-task-list',
  standalone: true,
    imports: [
        NgForOf,
        RouterLink,
        RouterLinkActive
    ],
  templateUrl: './user-task-list.component.html',
  styleUrl: './user-task-list.component.css'
})
export class UserTaskListComponent implements OnInit{
  protected  status : string[] = ["validé" , "non validé"];
  private user = JSON.parse(String(localStorage.getItem("user")));
  private employee!: EmployeeModel;

   protected header:  string[] = ["No" ,"debut" , "fin" , "contenu" , "tache" , "statut" , "actions"  ];
  dataSource: TaskScheduled2[] =[] ;

/* id : number;
    beginning: string;
    content: any;
    employee: any;
    end: string;
    status: boolean;
    taskInserted: any;*/


  constructor(
    private employeeService: EmployeeService ,
    protected service : TaskService ,
    private toastr : ToastrService ,
    private router  : Router
  )  {}
    ngOnInit(): void {
      this.getAllData();
    }

  getAllData(){
    this.employeeService.getEmployeeByEmail(this.user.email).subscribe(data =>{
      console.log(data);
      this.employee = data;

      this.service.getTaskScheduleForOne(this.employee.id).subscribe(data =>{
        console.log(data);
        this.dataSource  = data;

      } , error => {
        console.log(error);
        this.toastr.error(iconApp + " Erreur de Chargement!!!!" , manager , {enableHtml:true})
      })

    } , error => {
      console.log(error);
      this.toastr.warning(iconApp+ "il semble avoir un problème avec la récupération de vos données ." , manager , {enableHtml:true})
    });



  }

  delete(p: TaskScheduled2) {
      let conf  = confirm(" Cette tache sera supprimé !!");
      if(!conf) return;
      this.service.deleteTaskScheduled(p.id).subscribe(data =>{
           window.location.reload();
           this.toastr.success(iconApp+ " Tache suprimée avec succès !!" , manager , {enableHtml:true});

      } , error => {
        console.log(error);
      })
        this.toastr.error(iconApp +" Erreur de supprimer!!!!" , manager , {enableHtml:true});
  }
}
