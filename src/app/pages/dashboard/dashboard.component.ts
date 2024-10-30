import { Component, OnInit } from '@angular/core';
import {PositionService} from "../PositionTools/service/position.service";
import {TaskService} from "../TaskTools/service/task.service";
import {ContenuService} from "../contenuTools/service/contenu.service";
import {EmployeeService} from "../EmployeeTools/service/employee.service";
import {RepartitionService} from "../RepartitionTools/repartition/repartition.service";




@Component({
    selector: 'dashboard-cmp',

    templateUrl: 'dashboard.component.html'
})

export class DashboardComponent implements OnInit{

  protected nbrPosition! : number ;
  protected nbrTask! : number ;
  protected nbrContenu! : number ;
  protected nbrEmployee! : number ;
  protected nbrRepartition! : number ;
  protected nbrTaskScheduled! : number ;


  constructor(
    private positionService : PositionService,
    private taskService : TaskService ,
    private  contenuService : ContenuService ,
    private  EmployeeService : EmployeeService ,
    private repartitionService : RepartitionService ,

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
        this.nbrTask = data.length;
      });
      this.contenuService.allContenu().subscribe(data => {

          this.nbrContenu = data.length;
      });
      this.EmployeeService.allEmployees().subscribe(data => {

      this.nbrEmployee = data.length;
      })

      this.repartitionService.allRepartition().subscribe(data => {
          this.nbrRepartition = data.length;
      })
      this.taskService.AllTaskScheduled().subscribe(data => {
        this.nbrTaskScheduled = data.length;
      })
  }




}
