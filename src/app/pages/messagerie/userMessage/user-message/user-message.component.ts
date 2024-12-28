import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {getTodayDate, iconApp, manager, Message} from "../../../../models/models";
import {ServiceMessage} from "../../serviceMessage/service/service-message.service";
import {ToastrService} from "ngx-toastr";
import Swal from "sweetalert2";
import {NgClass} from "@angular/common";
import SockJS from "sockjs-client";
import Client from "sockjs-client";
import Stomp from '@stomp/stompjs';

@Component({
  selector: 'app-user-message',
  standalone: true,
  imports: [
    FormsModule,
    NgClass
  ],
  templateUrl: './user-message.component.html',
  styleUrl: './user-message.component.css'
})
export class UserMessageComponent implements OnInit , OnDestroy {
   protected message: Message =   {  nature:"" ,  content : "" , receiver :"" , id : 0 , sender :"" , file : undefined};
   protected content = " ";
   protected file : any ;
   protected msg !:string ;
   private server  !: any;
   private send : boolean = false

   private emailEmployee : string = JSON.parse(String(localStorage.getItem("user"))).email;
   constructor(private service : ServiceMessage , private toastr : ToastrService ) {

   }

  ListMessages: any[] = [];
  msgServer !: any;

  ngOnInit(): void {
      this.getAllMessage();
      this.connexionServer();
      this.service.connect( ); // Update with your backend URL
     this.service.eventSource.onmessage = event => { this.message = event.data;
      console.log(this.msg)
     };



  }




  triggerFileInput(): void {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  }

  onFileSelected(event: any) {
    this.file = event.target.files[0];
  }

  protected readonly getTodayDate = getTodayDate;


  async giveReceiver() {
    const { value: email } = await Swal.fire({
      title: "Email du destinataire",
      input: "email",
      inputLabel: "email du destinataire",
      inputPlaceholder: "veuillez entrer un email valide"
    });
    if (email) {
      console.log(this.content);
      this.message.content = this.content ;
      this.message.receiver = email ;
      this.message.sender = this.emailEmployee ;
      if(this.message.file == undefined) this.message.file =  new File([], "", {type: 'application/octet-stream'});

      this.sendMessage();
    //  this.getAllMessage();


      console.log(this.message.sender);
      console.log(this.message.receiver);
    }
  }


  getAllMessage() {
      this.service.getMessages(this.emailEmployee).subscribe(data =>{
          this.ListMessages =   data ;
      }, error => {
          console.log(error)
      })
  }

  delete(id : number, nature: any) {

  }


  sendMessage(){
    console.log(this.message)
    console.log(this.file)

    this.send = true ;
    this.service.sendMessage(this.message , this.file).subscribe(data =>{
        console.log(data);
        this.getAllMessage()


    } , error => {
      console.log(error)
    })
  }
  connexionServer(){
      if(this.send){
        this.service.connexionSeverMessage()
        this.send = false;

      }

  }




  ngOnDestroy() { this.service.closeConnection(); }
}










