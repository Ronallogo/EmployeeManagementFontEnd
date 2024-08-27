import {Component, OnInit} from '@angular/core';
import {EmployeeModel, iconApp, manager} from "../../../../models/models";
import {EmployeeService} from "../../../EmployeeTools/service/employee.service";
import {TaskService} from "../../../TaskTools/service/task.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-user-task-list',
  standalone: true,
  imports: [],
  templateUrl: './user-task-list.component.html',
  styleUrl: './user-task-list.component.css'
})
export class UserTaskListComponent implements OnInit{
  private user = JSON.parse(String(localStorage.getItem("user")));
  private employee!: EmployeeModel;




  constructor(
    private employeeService: EmployeeService ,
    private service : TaskService ,
    private toastr : ToastrService ,
  )  {}
  ngOnInit(): void {
  }

  getAllData(){
    this.employeeService.getEmployeeByEmail(this.user.email).subscribe(data =>{
      console.log(data);
      this.employee = data;

    } , error => {
      console.log(error);
      this.toastr.warning(iconApp+ "il semble avoir un problème avec la récupération de vos données ." , manager , {enableHtml:true})
    });
    this.service.getTaskScheduleForOne(this.employee.id).subscribe(data =>{
      console.log(data);

    })


  }
}
