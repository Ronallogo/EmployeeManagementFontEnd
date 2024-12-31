import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {getTodayDate, iconApp, manager, Message} from "../../../../models/models";
import {ServiceMessage} from "../../serviceMessage/service/service-message.service";
import {ToastrService} from "ngx-toastr";
import Swal from "sweetalert2";
import {NgClass} from "@angular/common";
import { saveAs } from 'file-saver';
import {base64StringToBlob} from "blob-util";


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
export class UserMessageComponent implements  OnInit , OnDestroy {
   protected message: Message =   { delete_for_sender : false , delete_for_recipient : false ,  date : "" , name : "" , nature:"" ,  content : "" , receiver :"" , id : 0 , sender :"" , file : undefined};
   protected content = " ";
   protected file : any ;
   protected msg !:string ;

   private send : boolean = false

   protected emailEmployee : string = JSON.parse(String(localStorage.getItem("user"))).email;
   constructor(private service : ServiceMessage , private toastr : ToastrService ) {

   }

  ListMessages: any[] = [];


  ngOnInit(): void {
    this.getAllMessage();
    setInterval(() => { this.checkMessage(); }, 5000);
  }




  triggerFileInput(): void {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  }


  onFileSelected(event: any) {
    if (event.target.files[0].type == "application/pdf"){
      this.file = event.target.files[0];
      this.message.name  =  this.file.name ;

    }else{
      this.toastr.warning(iconApp+"Vérifiez que ce fichier soit en format PDF !!" , manager , {enableHtml:true});
    }


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
        this.ListMessages = data.filter((m  : Message)=>
          (m.sender === this.emailEmployee && !m.delete_for_sender) ||
          (m.receiver === this.emailEmployee && !m.delete_for_recipient)
        );
        console.log(data)
      }, error => {
          console.log(error)
      })
  }

  delete(id : number) {
      this.service.delete(id , this.emailEmployee).subscribe(data =>{
        console.log(data);
      }, error => {
        console.log(error);
      })
  }


  sendMessage(){
    console.log(this.message)
    console.log(this.file)

    this.send = true ;
    this.service.sendMessage(this.message , this.file).subscribe(data =>{
        console.log(data);
        this.getAllMessage();
        //this.service.connect();

    } , error => {
      console.log(error)
    })
  }

  checkMessage(){
    this.service.getMessages(this.emailEmployee).subscribe(data =>{
      data.forEach((m : Message)=>{
          if(m.sender === this.emailEmployee && !m.delete_for_sender){
              this.ListMessages.push(m)
          }
      })
    }, error => {
      console.log(error)

    })
  }


  ngOnDestroy() { this.service.closeConnection(); }





  download(file : any , name : string) {
    const blob = base64StringToBlob( file, 'application/pdf');
    saveAs(blob ,  name)
  }






}










