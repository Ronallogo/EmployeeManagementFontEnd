import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthenticationService} from "../auth/authentication.service";
import { jwtDecode } from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  public permit : boolean = false;
  private jwt !: any;
  private objJWT : any

  private user  = {
    email :"" ,
    role: ""

  };

  host = "http://localhost:8080/api/auth";
  constructor ( private http: HttpClient,
              private authService: AuthenticationService) { }


  login(data: { email: any; password: any }) {
    return this.http.post(this.host + "/authenticate", data, {
      observe: 'response',
      headers: { 'Content-Type': 'application/json' }
    });
  }

  setPermission(permit : boolean):void {
      this.permit  = permit;
  }

  getPermission():boolean{
    return this.permit;
  }

  parseJWT() {
    console.log(this.jwt)
   this.objJWT  =    jwtDecode(this.jwt.access_token);
    this.user.email = this.objJWT.email
    this.user.role = this.objJWT.roles
    console.log(this.objJWT);
    console.log(this.user);
    localStorage.setItem('user',JSON.stringify(this.objJWT.sub));

  }

  saveToken(jwt : any) : void {
      localStorage.setItem('jwt', jwt)
      this.jwt = jwt ;
      this.parseJWT();

  }

  getUser(){}



}
