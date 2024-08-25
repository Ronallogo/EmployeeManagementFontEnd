import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthenticationService} from "../auth/authentication.service";
import { jwtDecode } from 'jwt-decode';
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";


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
              private authService: AuthenticationService , private router : Router , public toastr : ToastrService) { }


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

  parseJWT(){
    console.log(this.jwt)
    this.objJWT  =    jwtDecode(this.jwt.access_token);
    this.user.email = this.objJWT.sub
    this.user.role = this.objJWT.roles.at(0).authority
    console.log(this.objJWT);
    console.log(this.user);
    localStorage.setItem('user',JSON.stringify(this.user));

  }

  saveToken(jwt : any) : void {
      localStorage.setItem('jwt', jwt)
      this.jwt = jwt ;
      this.parseJWT();

  }
  loadToken(){
    this.jwt=localStorage.getItem('jwt');
    if(this.jwt != null){
        this.parseJWT();
        this.router.navigateByUrl("/dashbord");
        this.toastr.success(`bienvenu dans votre interface` , "EMPLOYEE MANAGER")

    }
  }

  getUser(){
    return this.user ;
  }

  logout(){
    localStorage.removeItem('jwt');
    localStorage.removeItem('user');
    this.initParams();
  }

  initParams(){
    this.jwt=undefined;
    this.user = {
      email :"" ,
      role: ""}

    console.log(localStorage.getItem("jwt"))
    console.log(localStorage.getItem("user"))
  }



}
