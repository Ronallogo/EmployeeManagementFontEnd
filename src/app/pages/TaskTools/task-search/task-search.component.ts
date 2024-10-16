import {Component, OnInit} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {iconApp, manager, PositionModel, TaskModel} from "../../../models/models";
import {PositionService} from "../../PositionTools/service/position.service";
import {TaskService} from "../service/task.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-task-search',
  standalone: true,
    imports: [
        FormsModule,
        NgForOf,
        RouterLink,
        RouterLinkActive,
        NgIf
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
    private toastr : ToastrService

  ){}
  ngOnInit(): void {
  }

  searchTask(keyword : string){
    this.service.searchTask(keyword).subscribe(data => {
      this.dataSource = data ;
      console.log(data);
      if(this.dataSource.length == 0 ) this.toastr.warning(iconApp + " Aucune tache ne correspond a ce nom !! " , manager , {enableHtml:true});

    } , error => {
      console.log(error);
    });
  }



}
