import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {DemandeConge, DemandeConge2, EmployeeModel, EmployeeModel2, PositionModel} from "../../../models/models";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserSettingService {

  private Url : string = environment.host+"/timeOff/apply";


  constructor(private Http: HttpClient) { }


  createDemandeConge(demande : DemandeConge2) : Observable<any> {

      return this.Http.post('http://localhost:8080/api/auth/employee_manager/timeOff/apply/create' , {
        beginning : demande.beginning ,
        end : demande.end ,
        apply : demande.apply ,
        validate : demande.validate,
        employee : demande.employee ,
        type : demande.type

      })
  }

  report(id  : number) : Observable<any>{
    return this.Http.get( "http://127.0.0.1:8080/api/auth/employee_manager/payStub/report/pdf/"+id , {
      responseType: "Blob" as "json"
    });
  }




}
