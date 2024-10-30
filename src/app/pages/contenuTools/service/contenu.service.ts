import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {  ContenuModel, ContenuModel2} from "../../../models/models";
import {Observable} from "rxjs";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class ContenuService {

  private Url : string = environment.host+"/content"
  private contenu!: ContenuModel;


  constructor(
    private http: HttpClient,
    private router: Router
  ) { }



  allContenu(): Observable<ContenuModel[]> {
    return  this.http.get<any>(this.Url + '/all');
  }

  deleteContenu(id: number) : Observable<any> {
    return   this.http.delete(this.Url + '/delete/' + id);

  }

  getContenu() : ContenuModel {
    console.log(this.contenu + "give")
    if(this.contenu ==undefined) window.location.replace("http://localhost:4200/#/contenu-list")
    return this.contenu
  }
  setContenu(Contenu : ContenuModel){
    this.contenu = Contenu;
    console.log(Contenu + " receive")
  }

  updateContenu(id : number, Contenu  : any  ){
    return this.http.put(this.Url + '/edit/'+id , Contenu)
  }


  createContenu(Contenu :  any ){
    return this.http.post(this.Url + '/create', Contenu)
  }


  searchContenu(keyword : string) : Observable<any>{
    return this.http.get(this.Url + '/search/' + keyword )
  }

  report() : Observable<any>{
    return this.http.get( "http://127.0.0.1:8080/api/auth/employee_manager/content/report/pdf" , {
      responseType: "Blob" as "json"
    });
  }
}
