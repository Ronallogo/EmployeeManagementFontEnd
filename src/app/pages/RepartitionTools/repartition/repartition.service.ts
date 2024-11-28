import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {Observable} from "rxjs";
import {getTodayDate, repartition} from "../../../models/models";

@Injectable({
  providedIn: 'root'
})
export class RepartitionService {


  private baseUrl: string = environment.host+"/repartition";

  constructor(private http: HttpClient) { }


  createRepartition(repartition : any) :Observable<any>{
      let data = {
        employee : repartition.employee ,
        taskScheduled  : repartition.task ,
        function : repartition.function ,
        date : repartition.date ,
      }
      return this.http.post(this.baseUrl+"/create",data)
  }

  allRepartition():Observable<repartition[]>{
    return this.http.get<repartition[]>(this.baseUrl+"/all");
  }

  deleteEmployeeFromRepartition(id : number) : Observable<any>{
     return this.http.delete(this.baseUrl+"/dropEmployee/"+id)
  }

  searchRepartition(keyword : string):Observable<any>{
     return this.http.get(this.baseUrl+"/searchMany/"+keyword)
  }
}
