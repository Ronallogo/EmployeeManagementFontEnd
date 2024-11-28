import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {PayStubModel2} from "../../../models/models";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private Url : string = environment.host+"/notification";







  constructor(protected http: HttpClient) { }



  getAllNotification(id_employee : number):Observable<any> {
    return  this.http.get(this.Url + "/allForOne/"+id_employee);
  }

  create(notification : {
    message : string,
    employee : number,
    date : string,
    type : string,

  }){
    return this.http.post(this.Url + "/create " , notification)
  }

  changeState(id_notification : number) : Observable<any> {
    return  this.http.put(this.Url + "/changeState/"+id_notification , {});
  }

  delete(id_notification : number) : Observable<any> {
    return  this.http.delete(this.Url + "/delete/"+id_notification);
  }







}
