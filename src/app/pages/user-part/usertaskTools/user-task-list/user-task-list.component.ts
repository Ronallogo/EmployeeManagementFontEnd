import {Component, OnInit} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {
  ContenuModel,
  EmployeeModel,
  iconApp,
  manager, repartition,
  TaskInsertedModel2,
  TaskScheduled, TaskScheduled2
} from "../../../../models/models";
import {EmployeeService} from "../../../EmployeeTools/service/employee.service";
import {TaskService} from "../../../TaskTools/service/task.service";
import {ContenuService} from "../../../contenuTools/service/contenu.service";
import {ToastrService} from "ngx-toastr";
import {RepartitionService} from "../../../RepartitionTools/repartition/repartition.service";
import {NgxPaginationModule} from "ngx-pagination";
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";



@Component({
  selector: 'app-task-scheduled-creation-update',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    ReactiveFormsModule,
    NgIf,
    NgxPaginationModule,
    RouterLink,
    RouterLinkActive,
    RouterOutlet
  ],
  templateUrl: './user-task-list.component.html',
  styleUrl: './user-task-list.component.css'
})
export class UserTaskListComponent implements  OnInit{

 protected header:  string[] = ["Photo","Nom","Email","Poste","Role"];
 protected emailCurrentUser : string ="";
 protected functionCurrentUser : string = "";

  protected listRepartition : repartition[] = [];
  views:  boolean = false;
  currentPage: number = 1;
  keyword: string = "";

  constructor(private service : RepartitionService , private toastr : ToastrService){}

  ngOnInit(): void {
    this.emailCurrentUser = JSON.parse(String(localStorage.getItem("user"))).email;
    this.getAllRepartitionForEmployee()
    console.log(JSON.parse(String(localStorage.getItem("user"))).email);
    console.log(this.emailCurrentUser);


  }


  getAllRepartitionForEmployee(){
    setTimeout(()=>{
      this.setViews()
    } , 2000)

    this.service.allRepartition().subscribe(data => {

      console.log(data);
      this.listRepartition = data.filter(rep => !rep.status);
      data.forEach((repartition : repartition) => {
        repartition.listEmployee.forEach(employee => {
          if(employee.email == this.emailCurrentUser){
            this.functionCurrentUser = employee.function
            console.log(this.functionCurrentUser)
            this.views = false;
          }
        })
      })


    } , error => {
      console.log(error)
      this.toastr.warning(iconApp+"Erreur de chargement des repartition" , manager , {enableHtml:true} );
    })
  }

  getImageUrl(photo: any) {
    return `data:image/jpg;base64,${photo}`;
  }
  setViews(){
    this.views = !this.views;
  }

  pageChanged($event: number) {
    this.currentPage = $event ;


  }


  deleteEmployeeFromRepartition(id : number){
    this.service.deleteEmployeeFromRepartition(id).subscribe(data =>{
      this.getAllRepartitionForEmployee();
      this.setViews()
      this.toastr.success(iconApp+"Cet employé a été retiré de la tache avec succès!!!" , manager , {enableHtml : true});

    } , error => {
      console.log(error);
    })
  }


  searchRepartition(keyword: string) {
      if(keyword == ""){
         this.getAllRepartitionForEmployee();
      }
      this.service.searchRepartition(keyword).subscribe(data => {
          this.listRepartition = data ;
      })
  }
}
