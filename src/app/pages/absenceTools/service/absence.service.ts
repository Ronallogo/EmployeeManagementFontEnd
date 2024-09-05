import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {AbsenceModel, AbsenceModel2} from "../../../models/models";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AbsenceService {
  private Url : string = environment.host+"/absence"
  private absence!: AbsenceModel;
  constructor(private http : HttpClient) { }


  allAbsence(): Observable<AbsenceModel[]> {
    return  this.http.get<any>(this.Url + '/all');
  }

  deleteAbsence(id: number) : Observable<any> {
    return   this.http.delete(this.Url + '/delete/' + id);

  }

  getAbsence() : AbsenceModel {
    console.log(this.absence + "give")
    return this.absence
  }
  setAbsence(Absence : AbsenceModel){
    this.absence = Absence;
    console.log(Absence + " receive")
  }

  updateAbsence(id : number, Absence  : AbsenceModel2  ){
    return this.http.put(this.Url + '/edit/'+id , Absence)
  }


  createAbsence(Absence: { absence_day: string; reason: string; email: string }){
    return this.http.post(this.Url + '/create', Absence)
  }


  searchAbsence(keyword : string) : Observable<any>{
    console.log( keyword + " is send")
    return this.http.get(this.Url + '/search/' + keyword )
  }


  report() : Observable<any>{
    return this.http.get( "http://127.0.0.1:8080/api/auth/employee_manager/absence/report/pdf" , {
      responseType: "Blob" as "json"
    });
  }
}
