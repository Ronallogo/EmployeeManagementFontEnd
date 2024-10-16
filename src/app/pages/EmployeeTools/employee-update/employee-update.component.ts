import {Component, OnInit} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {EmployeeModel, EmployeeModel3, EmployeeModel5, iconApp, manager, PositionModel} from "../../../models/models";
import {EmployeeService} from "../service/employee.service";
import {ToastrService} from "ngx-toastr";
import {PositionService} from "../../PositionTools/service/position.service";
import {ApplicationService} from "../../../globalService/appService/application.service";

@Component({
  selector: 'app-employee-update',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './employee-update.component.html',
  styleUrl: './employee-update.component.css'
})
export class EmployeeUpdateComponent implements OnInit{
  private emailUser !: string ;
  protected password_body :{old_password : string , new_password : string} = {old_password  :"" , new_password  :""}
  protected id !: number ;
  protected position!: number ;
  protected employee !: EmployeeModel3  ;

  protected dataEmployee!: EmployeeModel5;
  protected  allPosition: PositionModel[] = [];
  private responseCheckPassword : boolean = false;

  constructor(
    private employeeService : EmployeeService ,
    private positionService : PositionService ,
    private toastr : ToastrService ,
    private testLogin : ApplicationService  ) {}


  ngOnInit() {
      this.getData() ;
  }


  getData(){
     this.employee =  this.employeeService.getEmployee();
     this.emailUser = this.employee.email;
     this.position = this.employee.position.id


     this.positionService.allPositions().subscribe(data =>{
        this.allPosition = data;
     } , error => {
       console.log(error);
     })

  }



  UpdateEmployee() {
    console.log(this.employee);
    this.employee.position = this.position ;
    console.log(this.password_body);
    this.id = this.employee.id;
    console.log("cette position : "+this.employee.position)
    this.dataEmployee = this.employee ;

    this.processForUpdateWithoutPassWord();


  }



   processForUpdateWithoutPassWord(){

    console.log(this.dataEmployee);
    this.testLogin.fetchUser(this.emailUser).subscribe(data =>{
      console.log("fetchUser"+data.id);

      console.log(JSON.stringify(this.dataEmployee.position));

      this.employeeService.updateEmployeeWithoutPassword(data , data.id , this.id , this.dataEmployee ).subscribe(data =>{
        console.log(data);
        this.emailUser = String(data.email) ;
        this.toastr.success(iconApp+" mise à jour effectuée avec succès!!" , manager , {enableHtml:true});



      },error => {
        console.log(error);
        this.toastr.error(iconApp+" la mise a jour de l'employé a échouée  !!! .... assurez vous que le poste soient sélectionné " , manager ,{enableHtml:true})
      })

    } , error => {
      console.log(error);
      this.toastr.warning(iconApp+" Cet employé n'est plus enregistré en tant qu'utilisateur !!!" , manager ,{enableHtml:true})
    })
  }




  /* if(this.password_body.old_password =="" && this.password_body.new_password  == "" ){
   this.toastr.warning(iconApp + " Mot de passe non modifié " , manager , {enableHtml:true})
 }
 else if(this.checkPassword()){


 }
  else{
    this.toastr.warning(iconApp+" Votre ancien password n'est pas valide !!" , manager , {enableHtml:true});
  }
*/




  /* processForUpdateWithPassWord(){
    this.testLogin.fetchUser(this.emailUser).subscribe(data =>{
      console.log("fetchUser"+data.id);
      data.password =  this.password_body.new_password;
      this.employeeService.updateEmployeeWithPassword(data , data.id , this.id , this.dataEmployee ).subscribe(data =>{
          console.log(data);
          this.toastr.success(iconApp+" mise à jour effectuée avec succès!!" , manager , {enableHtml:true});



      },error => {
        console.log(error);
        this.toastr.error(iconApp+" la mise a jour de l'employé a échouée !!!" , manager ,{enableHtml:true})
      })

    } , error => {
      console.log(error);
      this.toastr.warning(iconApp+" Cet employé n'est plus enregistré en tant qu'utilisateur !!!" , manager ,{enableHtml:true})
    })
  }*/



}
