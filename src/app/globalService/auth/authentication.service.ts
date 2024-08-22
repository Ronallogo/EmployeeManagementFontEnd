import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import jwt_decode from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  host = "http://localhost:8080/api/auth";
  user !: {
    name : number ,
    username : string,
    password : string,
    role :any
  }
  jwt!:any ;

  employee! : any ;


  constructor(private http : HttpClient) {}


  headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.jwt});
  fct:any;
  login(data:{password  : any }){
      return this.http.post(this.host+"/login", data , {observe : "response"})
  }


  saveToken(jwt : string){
      localStorage.setItem("token", jwt);
      this.jwt = jwt;
      this.parseJWT();
  }

  parseJWT() {

   /* this.user.name = jwt_decode.jwtDecode();
    this.user.username = jwt_decode.jwtDecode(this.user.username);
    this.user.role = jwt_decode.jwtDecode(this.role);
    this.employee = jwt_decode.jwtDecode(this.employee).sub;
    localStorage.setItem('employee' , JSON.stringify(this.employee));*/

  }

  isAdmin(){
    localStorage.setItem('roles',JSON.stringify('ADMIN'));
    // @ts-ignore
    return this.roles.indexOf('ADMIN')>=0;
  }

  isUser(){
    localStorage.setItem('roles',JSON.stringify('USER'));
    // @ts-ignore
    return this.roles.indexOf('USER')>=0;
  }

  isAuthenticated(){
    //return this.role && (this.isAdmin() || this.isUser());
  }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('roles');
    this.initParams();
  }

  initParams(){
  /*  this.jwt=undefined;
    this.name=undefined;
    this.username=undefined;
    this.role=undefined;*/

  }

  loadToken(){
    this.jwt=localStorage.getItem('token');
    this.parseJWT();
  }
}
