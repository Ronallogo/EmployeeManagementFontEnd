import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {PayStubModel, PayStubModel2  } from "../../../models/models";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PayStubService {

  private Url : string = environment.host+"/payStub";

  private payStub!: PayStubModel2;





  constructor(protected http: HttpClient) { }



  allPayStubs(): Observable<PayStubModel2[]> {
    return  this.http.get<any>(this.Url + '/all');
  }



  getPayStub() {
    console.log(this.payStub + "give")
    return this.payStub
  }
  setPayStub(PayStub : PayStubModel2){
    this.payStub = PayStub;
    console.log(PayStub + " receive")
  }
  getPayStubForOne(email : string){
    return this.http.get<any>(this.Url + '/getPayStubForOne/' + email)
  }

  setPayStubInserted(PayStub : PayStubModel2){
    this.payStub = PayStub;
    console.log(PayStub + " receive")
  }

  updatePayStub(id : number, PayStub :  {PayStub_name : string, PayStub_description : string } ){
    return this.http.put(this.Url + '/edit/'+id , PayStub)
  }


  createPayStub(PayStub :  PayStubModel ){
    return this.http.post(this.Url + '/create', PayStub)
  }


  searchPayStub(keyword : string) : Observable<any>{
    return this.http.get(this.Url + '/search/' + keyword )
  }
  searchPayStubById(keyword : number) : Observable<any>{
    return this.http.get(this.Url + '/searchById/' + keyword )
  }

  deletePayStub(id : number){
    return this.http.delete(this.Url + '/delete/'+id)
  }

  refreshPayStub(id :number , data : PayStubModel):Observable<any>{
      return this.http.put(this.Url + '/edit/'+id, data)
  }
  initPayStub(id :number , data : PayStubModel):Observable<any>{
    return this.http.put(this.Url + '/refresh/'+id, data)
  }
}
