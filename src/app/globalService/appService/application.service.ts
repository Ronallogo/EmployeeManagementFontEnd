import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthenticationService} from "../auth/authentication.service";

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  constructor ( private http: HttpClient,
              private authService: AuthenticationService) { }



}
