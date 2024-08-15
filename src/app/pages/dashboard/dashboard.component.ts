import { Component, OnInit } from '@angular/core';
import {PositionService} from "../PositionTools/service/position.service";
import {TaskService} from "../TaskTools/service/task.service";




@Component({
    selector: 'dashboard-cmp',

    templateUrl: 'dashboard.component.html'
})

export class DashboardComponent implements OnInit{

  protected nbrPosition! : number ;
  protected nbrTask! : number ;

  constructor(
    private positionService : PositionService,
    private taskService : TaskService

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
      })


  }

  refreshNbrPosition(){
      this.getAllData()
  }



}
