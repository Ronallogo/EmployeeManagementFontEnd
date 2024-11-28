import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {AuthenticationService} from "../../../globalService/auth/authentication.service";
import {Observable} from "rxjs";
import {CongeModel, CongeModel2, DemandeConge, DemandeConge2} from "../../../models/models";

@Injectable({
  providedIn: 'root'
})
export class CongeService {

  private  baseUrl: string = environment.host+ "/timeOff";

  private selectedConge!:  any;

  private DemandeConge !: any ;


  constructor(
    private http: HttpClient,
  ) {}



  allConges(): Observable<CongeModel[]> {
    return this.http.get<CongeModel[]>(`${this.baseUrl}/all`);
  }
  allDemandeConges(): Observable<DemandeConge[]> {
    return this.http.get<DemandeConge[]>(`${this.baseUrl}/apply/all`);
  }

  deleteConge(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`);
  }
  deleteDemandeConge(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/apply/delete/${id}`);
  }

  getConge(): CongeModel {
    return this.selectedConge;
  }
  getDemandeConge(): any {
    return this.selectedConge;
  }

  setConge(Conge: any): void {
    this.selectedConge = Conge;
  }
  setDemandeConge(Conge: any): void {
    this.selectedConge = Conge;
  }

  updateConge(id: number, Conge: CongeModel): Observable<CongeModel> {
    return this.http.put<CongeModel>(`${this.baseUrl}/edit/${id}`, Conge);
  }

  updateDemandeConge(id: number, Conge: DemandeConge2): Observable<DemandeConge> {
    return this.http.put<DemandeConge>(`${this.baseUrl}/apply/edit/${id}`, Conge);
  }

  createConge(Conge: CongeModel2 ): Observable<CongeModel> {

    return this.http.post<CongeModel>(`${this.baseUrl}/create`, Conge);
  }

  searchConge(keyword: string): Observable<CongeModel[]> {
    return this.http.get<CongeModel[]>(`${this.baseUrl}/search/${keyword}`);
  }
  searchCongeById(keyword: number): Observable<CongeModel[]> {
    return this.http.get<CongeModel[]>(`${this.baseUrl}/searchByIdEmployee/${keyword}`);
  }


  report() : Observable<any>{
    return this.http.get( "http://127.0.0.1:8080/api/auth/employee_manager/timeOff/report/pdf" , {
      responseType: "Blob" as "json"
    });
  }


  report2() : Observable<any>{
    return this.http.get( "http://127.0.0.1:8080/api/auth/employee_manager/timeOff/apply/report/pdf" , {
      responseType: "Blob" as "json"
    });
  }
}
