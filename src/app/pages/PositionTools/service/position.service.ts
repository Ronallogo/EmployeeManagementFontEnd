import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../../environments/environment";
import {PositionModels} from "../../../models/Position.models";

@Injectable({
  providedIn: 'root'
})
export class PositionService {
  private Url : string = environment.host+"/position"
  private position!: PositionModels;


  constructor(
    private http: HttpClient
  ) { }



  allPositions(): Observable<PositionModels[]> {
    return  this.http.get<any>(this.Url + '/all');
  }

  deletePosition(id: number) : Observable<any> {
       return   this.http.delete(this.Url + '/delete/' + id);

  }

  getPosition() : PositionModels {
    console.log(this.position + "give")
    return this.position
  }
  setPosition(position : PositionModels){
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
}
