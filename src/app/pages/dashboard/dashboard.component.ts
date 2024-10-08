import { Component, OnInit } from '@angular/core';
import {PositionService} from "../PositionTools/service/position.service";
import {TaskService} from "../TaskTools/service/task.service";
import {ContenuService} from "../contenuTools/service/contenu.service";
import {EmployeeService} from "../EmployeeTools/service/employee.service";




@Component({
    selector: 'dashboard-cmp',

    templateUrl: 'dashboard.component.html'
})

export class DashboardComponent implements OnInit{

  protected nbrPosition! : number ;
  protected nbrTask! : number ;
  protected nbrContenu! : number ;
  protected nbrEmployee! : number ;


  constructor(
    private positionService : PositionService,
    private taskService : TaskService ,
    private  contenuService : ContenuService ,
    private  EmployeeService : EmployeeService ,

  ) {
  }

  ngOnInit(): void {
      this.getAllData()
  }
  getAllData(){
      this.positionService.allPositions().subscribe(data => {
        console.log(data);
        this.nbrPosition = data.length;

      } , error => {
        console.log(error);
      });

      this.taskService.allTasksInserted().subscribe(data => {
        console.log(data);
        this.nbrTask = data.length;
      });

      this.contenuService.allContenu().subscribe(data => {
          console.log(data);
          this.nbrContenu = data.length;
      });
      this.EmployeeService.allEmployees().subscribe(data => {

      console.log(data);
      this.nbrEmployee = data.length;
      })
  }
  refreshNbrPosition(){
      this.getAllData()
  }


    protected readonly Date = Date;
}
