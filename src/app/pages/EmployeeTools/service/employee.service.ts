import { Injectable } from '@angular/core';
import { environment } from "../../../../environments/environment";
import {
  EmployeeModel,
  EmployeeModel2, EmployeeModel4,
  EmployeeModel5, EmployeeModel6,
  iconApp, imageConvert,
  manager,
  UserDetails, UserDetails2
} from "../../../models/models";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { AuthenticationService } from "../../../globalService/auth/authentication.service";
import {PayStubService} from "../../payStubTools/service/pay-stub.service";
import {ApplicationService} from "../../../globalService/appService/application.service";
import {ToastrService} from "ngx-toastr";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private  baseUrl: string = environment.host+ "/employee";

  private isCreate : boolean = false ;
  private  registerEndpoint: string = "http://localhost:8080/api/auth/register";
  private selectedEmployee!:  any;


  private user !: {
    id : number,
    firstname : string ,
    lastname : string ,
    email : string ,
    password : string ,
    role : string


  }


  constructor(
    private http: HttpClient,
    private serviceApp : ApplicationService ,
    private toastr: ToastrService,

  ) {}


 /* private getAuthHeaders(): HttpHeaders {
    return new HttpHeaders({ 'Authorization': 'Bearer ' + this.authService.jwt });
  }*/

  allEmployees(): Observable<EmployeeModel6[]> {
    return this.http.get<EmployeeModel6[]>(`${this.baseUrl}/all`);
  }

  deleteEmployee(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`);
  }

  getEmployee(): any {
    return this.selectedEmployee;
  }

  setEmployee(employee: EmployeeModel): void {
    this.selectedEmployee = employee;
  }

  updateEmployee(id: number, employee: EmployeeModel4 , photo : any  ): Observable<EmployeeModel> {
    return this.http.put<EmployeeModel>(`${this.baseUrl}/edit/${id}`, this.initializer(employee ,photo));
  }


  updateEmployeeWithoutPassword(user: UserDetails2, id_user: number, id_employee: number, employee: EmployeeModel5): Observable<EmployeeModel> {
    user = {
      id: user.id,
      firstname : employee.name ,
      lastname : employee.surname ,
      email : employee.email ,
      role : user.role
    };
    console.log(user)
    /*this.serviceApp.updateUserWithoutPassword(id_user , user).subscribe(data =>{
      console.log(data);
      this.toastr.info(iconApp+" ...mise à jour des données !!" , manager , {enableHtml:true});
      this.isCreate = true
    },error => {
      console.log(error);
      this.toastr.warning(iconApp+" La mise a jour des données n'a pas abouti en tant qu'utilisateur !!" , manager,{enableHtml:true});

    })*/


    let e = {
      "name" : employee.name ,
      "surname" : employee.surname ,
      "email" : employee.email ,
      "birthday" : employee.birthday ,
      "phone" : employee.phone ,
      "address" : employee.address,
      "position" : employee.position,



    }

    return this.http.put<EmployeeModel>(`${this.baseUrl}/edit/${id_employee}`, this.initializer(e ,imageConvert(employee.photo)));
  }





  createEmployee(employee: any , photo  : any): Observable<EmployeeModel>  {

    return    this.http.post<EmployeeModel>(`${this.baseUrl}/create`, this.initializer(employee , photo)) ;

  }


  searchEmployee(keyword: string): Observable<EmployeeModel[]> {
    return this.http.get<EmployeeModel[]>(`${this.baseUrl}/search/${keyword}`);
  }
  searchEmployeeById(id : number): Observable<EmployeeModel> {
    return this.http.get<EmployeeModel>(`${this.baseUrl}/searchById/${id}`);
  }

  registerUser(data: { firstname: string; lastname: string; email: string; password: string; role: string }): Observable<any> {
    return this.http.post<void>(this.registerEndpoint, data);
  }

  getEmployeeByEmail(email : string){
    return this.http.get<EmployeeModel>(`${this.baseUrl}/email/${email}`);
  }

  report() : Observable<any>{
    return this.http.get( "http://127.0.0.1:8080/api/auth/employee_manager/content/report/pdf" , {
      responseType: "Blob" as "json"
    });
  }

  initializer(employee: any , photo  : any){
    const employeeData  = new FormData()

    employeeData.append("name" , employee.name)
    employeeData.append("surname" , employee.surname)
    employeeData.append("email" , employee.email)
    employeeData.append("birthday" , new Date(employee.birthday).toDateString())
    employeeData.append("phone" , employee.phone)
    employeeData.append("address" , employee.address)
    employeeData.append("position" , employee.position)
    employeeData.append("file" , photo)

    return employeeData
  }

  initializer2(employee: any , photo  : any){
    const employeeData  = new FormData()

    employeeData.append("name" , employee.name)
    employeeData.append("surname" , employee.surname)
    employeeData.append("email" , employee.email)
    employeeData.append("birthday" , new Date(employee.birthday).toDateString())
    employeeData.append("phone" , employee.phone)
    employeeData.append("address" , employee.address)
    employeeData.append("position" , employee.position);
    employeeData.append("file" , photo)

    console.log("voici le poste : " + employeeData.get("position"))

    return employeeData
  }




}
