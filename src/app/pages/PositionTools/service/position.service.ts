import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../../environments/environment";
import {PositionModel} from "../../../models/models";

@Injectable({
  providedIn: 'root'
})
export class PositionService {
  private Url : string = environment.host+"/position"
  private position!: PositionModel;


  constructor(
    private http: HttpClient
  ) { }



  allPositions(): Observable<PositionModel[]> {
    return  this.http.get<any>(this.Url + '/all');
  }

  deletePosition(id: number) : Observable<any> {
       return   this.http.delete(this.Url + '/delete/' + id);

  }

  getPosition() : PositionModel {
    console.log(this.position + "give")
    return this.position
  }
  setPosition(position : PositionModel){
    this.position = position;
    console.log(position + " receive")
  }

  updatePosition(id : number, position :  {position_name : string, position_description : string } ){
      return this.http.put(this.Url + '/edit/'+id , position)
  }


  createPosition(position : {position_name : string |null , position_description : string | null} ){
    return this.http.post(this.Url + '/create', position)
  }


  searchPosition(keyword : string) : Observable<any>{
      return this.http.get(this.Url + '/search/' + keyword )
  }


  report() : Observable<any>{
    return this.http.get( "http://127.0.0.1:8080/api/auth/employee_manager/position/report/pdf" , {
      responseType: "Blob" as "json"
    });
  }
}
