import {Component, OnInit} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {NgForOf} from "@angular/common";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {PositionModel, TaskModel} from "../../../models/models";
import {PositionService} from "../../PositionTools/service/position.service";
import {TaskService} from "../service/task.service";

@Component({
  selector: 'app-task-search',
  standalone: true,
    imports: [
        FormsModule,
        NgForOf,
        RouterLink,
        RouterLinkActive
    ],
  templateUrl: './task-search.component.html',
  styleUrl: './task-search.component.css'
})
export class TaskSearchComponent implements OnInit {
  protected dataSource: TaskModel[] = [] ;
  public keyword! : string
  public header = ["No" , "nom" , "description" , "actions"];


  constructor(
    protected service : TaskService  ,

  ){}
  ngOnInit(): void {
  }

  searchTask(keyword : string){
    this.service.searchTask(keyword).subscribe(data => {
      this.dataSource = data ;
      console.log(data)

    } , error => {
      console.log(error);
    })
  }


  searchPosition(keyword: string) {

  }
}
