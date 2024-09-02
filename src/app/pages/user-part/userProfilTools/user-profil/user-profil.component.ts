import {Component, OnInit} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {
  ContenuModel,
  EmployeeModel,
  EmployeeModel2,
  iconApp,
  manager,
  TaskInsertedModel2
} from "../../../../models/models";
import {UserSettingService} from "../../service/user-setting.service";
import {EmployeeService} from "../../../EmployeeTools/service/employee.service";
import {ToastrService} from "ngx-toastr";
import {TaskService} from "../../../TaskTools/service/task.service";
import {PayStubService} from "../../../payStubTools/service/pay-stub.service";
import {AbsenceService} from "../../../absenceTools/service/absence.service";

@Component({
  selector: 'app-user-profil',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './user-profil.component.html',
  styleUrl: './user-profil.component.css'
})
export class UserProfilComponent implements OnInit{
  protected id !: number ;
  protected Employee !: EmployeeModel2 ;
  protected salaire :number = 0;
  protected task : number = 0
  protected  absence: number = 0;

  public user!: {email : string , role : string};

  constructor(
      private serviceEmployeeService : EmployeeService ,
      private toastr : ToastrService ,
      private serviceTask : TaskService ,
      private servicePayStub : PayStubService ,
      private serviceAbsence : AbsenceService
    ) {

  }



  ngOnInit(): void {
    this.getEmployee();
  }

  getEmployee(){
      this.user = JSON.parse(String(localStorage.getItem("user")));
      this.serviceEmployeeService.getEmployeeByEmail(this.user.email).subscribe(data =>{
          this.Employee = data;
          console.log(data)
          this.id = data.id
          this.serviceTask.getTaskScheduleForOne(this.id).subscribe(data =>{
              this.task = data.length
          } , error => {
            console.log(error);
            this.toastr.warning(iconApp + " nombre de tache non chargé" , manager , {enableHtml:true})
          });

          this.servicePayStub.getPayStubForOne(String(this.Employee.email)).subscribe(data =>{
              console.log(data);
               this.salaire = data.amount ;
          } , error => {
            this.toastr.warning(iconApp + "  salaire non chargé" , manager , {enableHtml:true})
          })

        this.serviceAbsence.searchAbsence(String(this.Employee.email)).subscribe(data =>{
          console.log(data);
          this.absence  =  data.length
        })

      } , error => {
        console.log(error);
        this.toastr.warning(iconApp + " nombre de d'absence non chargé" , manager , {enableHtml:true})
      })
  }

  updateUser(){
    this.serviceEmployeeService.updateEmployee(
          this.id ,
      {
        email  : this.Employee.email ,
        address : this.Employee.address ,
        phone : this.Employee.phone ,
        name : this.Employee.name,
        surname : this.Employee.surname ,
        birthday : this.Employee.birthday ,
        position : this.Employee.position.id

      }
    ).subscribe(data =>{
          this.refreshDataUser(data);
          console.log(data);
          this.toastr.success(iconApp+" mise à jour fait avec succès" , "EMPLOYEE MANAGER",{enableHtml:true});
    } ,error => {
      console.log(error);
      this.toastr.error(iconApp+" mise à jour n'a pas été faite veuillez réessayer plutard!!" , "EMPLOYEE MANAGER",{enableHtml:true});
    })
  }



  refreshDataUser(data : EmployeeModel){
      this.Employee = {
          email  : data.email,
          name : data.name,
          surname : data.surname,
          phone : data.phone ,
          birthday : data.birthday ,
          address : data.address,
        position : data.position
      }
  }

}
