import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {  ContenuModel, ContenuModel2} from "../../../models/models";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ContenuService {

  private Url : string = environment.host+"/content"
  private contenu!: ContenuModel;


  constructor(
    private http: HttpClient
  ) { }



  allContenu(): Observable<ContenuModel[]> {
    return  this.http.get<any>(this.Url + '/all');
  }

  deleteContenu(id: number) : Observable<any> {
    return   this.http.delete(this.Url + '/delete/' + id);

  }

  getContenu() : ContenuModel {
    console.log(this.contenu + "give")
    return this.contenu
  }
  setContenu(Contenu : ContenuModel){
    this.contenu = Contenu;
    console.log(Contenu + " receive")
  }

  updateContenu(id : number, Contenu  : ContenuModel2  ){
    return this.http.put(this.Url + '/edit/'+id , Contenu)
  }


  createContenu(Contenu :  ContenuModel2 ){
    return this.http.post(this.Url + '/create', Contenu)
  }


  searchContenu(keyword : string) : Observable<any>{
    return this.http.get(this.Url + '/search/' + keyword )
  }
}
