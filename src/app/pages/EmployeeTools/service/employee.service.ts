import { Injectable } from '@angular/core';
import { environment } from "../../../../environments/environment";
import {EmployeeModel, EmployeeModel2} from "../../../models/models";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthenticationService } from "../../../globalService/auth/authentication.service";
import {PayStubService} from "../../payStubTools/service/pay-stub.service";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private  baseUrl: string = environment.host+ "/employee";

  private isCreate : boolean = false ;
  private  registerEndpoint: string = "http://localhost:8080/api/auth/register";
  private selectedEmployee!:  any;
  private authService!: AuthenticationService

  constructor(
    private http: HttpClient,

  ) {}


 /* private getAuthHeaders(): HttpHeaders {
    return new HttpHeaders({ 'Authorization': 'Bearer ' + this.authService.jwt });
  }*/

  allEmployees(): Observable<EmployeeModel[]> {
    return this.http.get<EmployeeModel[]>(`${this.baseUrl}/all`);
  }

  deleteEmployee(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`);
  }

  getEmployee(): EmployeeModel {
    return this.selectedEmployee;
  }

  setEmployee(employee: EmployeeModel): void {
    this.selectedEmployee = employee;
  }

  updateEmployee(id: number, employee: EmployeeModel2): Observable<EmployeeModel> {
    return this.http.put<EmployeeModel>(`${this.baseUrl}/edit/${id}`, employee);
  }

  createEmployee(employee: any): Observable<EmployeeModel>  {
     const employeeData = {
       name: employee.name,
       surname: employee.surname,
       email: employee.email,
       birthday: employee.birthday,
       phone: employee.phone,
       address: employee.address ,
       position : employee.position
     };

     const userData = {
       firstname: employee.name,
       lastname: employee.surname,
       email: employee.email,
       password: employee.password,
       role: "USER"
     };

     this.registerUser(userData).subscribe(data =>{
       console.log(data);
        this.isCreate = true ;
     } , error => {
       console.log(error);

       }
     );

     return   this.http.post<EmployeeModel>(`${this.baseUrl}/create`, employeeData) ;

  }

  searchEmployee(keyword: string): Observable<EmployeeModel[]> {
    return this.http.get<EmployeeModel[]>(`${this.baseUrl}/search/${keyword}`);
  }

  private registerUser(data: { firstname: string; lastname: string; email: string; password: string; role: string }): Observable<void> {
    return this.http.post<void>(this.registerEndpoint, data);
  }

  getEmployeeByEmail(email : string){
    return this.http.get<EmployeeModel>(`${this.baseUrl}/email/${email}`);
  }
}
