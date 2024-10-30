import {Component, OnInit} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {TaskService} from "../../service/task.service";
import {ToastrService} from "ngx-toastr";
import {iconApp, manager, TaskScheduled2} from "../../../../models/models";

@Component({
  selector: 'app-task-scheduled-search',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    NgIf,
    ReactiveFormsModule,
    RouterLink,
    RouterLinkActive,
    NgClass,
    RouterOutlet
  ],
  templateUrl: './task-scheduled-search.component.html',
  styleUrl: './task-scheduled-search.component.css'
})
export class TaskScheduledSearchComponent implements  OnInit{

  constructor(protected service : TaskService , private toastr : ToastrService) {
  }


  dataSource:  TaskScheduled2[] =[];
  header:  string[] = ["No" ,"debut" , "fin" , "contenu" , "tache" , "statut" ,"type" , "personnes à assigner" , "actions"  ];
  keyword: any;
  protected  status : string[] = ["validé" , "non validé"];
  showTableBody: any;


  ngOnInit(): void {
  }

  searchTaskScheduled(keyword: any) {


      this.service.searchTaskScheduled(keyword).subscribe(data=>{

        this.showTableBody = false; // Masquer d'abord le corps
        setTimeout(() => {
          this.showTableBody = true;
          this.dataSource = data;// Ensuite, montrez-le
        }, 100);

          if(data.length == 0 ) {
            this.toastr.warning(iconApp + "Aucune tache n'a été trouvé", manager, {enableHtml: true});
          }
      } , error => {
        console.log(error)
          this.toastr.warning(iconApp+"Une erreur s'est produite"  , manager , {enableHtml:true});
      });



  }
}
