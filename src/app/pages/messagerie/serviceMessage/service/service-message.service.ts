import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, Subject} from "rxjs";

import {HttpClient} from "@angular/common/http";
import {Message} from "../../../../models/models";
import {environment} from "../../../../../environments/environment";

import * as Stomp from '@stomp/stompjs';
import SockJS from "sockjs-client";
import Client from "sockjs-client";
import {io, Socket} from "socket.io-client";


@Injectable({
  providedIn: 'root'
})
export class ServiceMessage {

  private  baseUrl: string= environment.host+ "/message";

  eventSource !: EventSource;

  private msgServer!: any
  private url: string = environment.host+"/sse/stream";
  private message!:any;

  constructor(private http : HttpClient){

  }











  connexionSeverMessage(){
      return this.http.get(this.url).subscribe(data =>{
          console.log("connexion server");

      })

    /*return new Observable(observer => {
       this.eventSource = new EventSource(this.baseUrl);
       //console.log("EventSource: ", this.eventSource);
      this.eventSource.onmessage = event => {
        this.msgServer = event.data;
        console.log(this.msgServer);
        observer.next(event.data)
        this.eventSource.close()
      };
      this.eventSource.onerror = error => {
        observer.error(error);
        this.eventSource.close();

      };
    });*/
  }

  /*connect( ) {
    return this.http.get(this.url).subscribe(data =>{
      this.eventSource = new EventSource(this.url );
      this.eventSource.onmessage = event => {
        this.message = event.data;
        console.log(this.message);
      };
      this.eventSource.onerror = error => {
        console.log('EventSource error:', error);

        this.eventSource.close();
      };
    } , error => {
        console.log(error)

    })

  }*/
  messageMessage(){
    return this.http.get(this.url).subscribe(data =>{})
  }


  sendMessage(ms :Message , file : any){
    return  this.http.post(this.baseUrl+"/send" , this.initializer(ms , file));
  }



  getMessages(email : string) : Observable<any>{
      return this.http.get(this.baseUrl+"/all/"+email)/*👍*/
  }
  checkMessages(email : string) : Observable<any>{
      return this.http.get(this.baseUrl+"/checkMessage/"+email)/*👍*/
  }


  delete(id_ms : number , email : string): Observable<any> {
     return this.http.delete(this.baseUrl+'/delete/'+id_ms+"/"+email);
  }


  initializer(message: any , file  : any){
    const ms  = new FormData();
    ms.append("message", new Blob([JSON.stringify(message)], { type: "application/json" }));
    ms.append("file" , file)
    console.log(ms.get("message"))
    console.log(ms.get("file"))
    return ms
  }


  getMsgServer(){ return this.msgServer}

  setMsgServer(){
      this.msgServer = undefined ;
  }



  closeConnection() { if (this.eventSource) { this.eventSource.close(); } }


}
