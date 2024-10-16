import {Component, OnInit} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {EmployeeModel, EmployeeModel2, iconApp, manager} from "../../../../models/models";
import {EmployeeService} from "../../../EmployeeTools/service/employee.service";
import {ToastrService} from "ngx-toastr";
import {TaskService} from "../../../TaskTools/service/task.service";
import {PayStubService} from "../../../payStubTools/service/pay-stub.service";
import {AbsenceService} from "../../../absenceTools/service/absence.service";
import {NgIf, NgOptimizedImage} from "@angular/common";
import {NgxSpinnerComponent} from "ngx-spinner";

@Component({
  selector: 'app-user-profil',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgIf,
    NgOptimizedImage,
    NgxSpinnerComponent
  ],
  templateUrl: './user-profil.component.html',
  styleUrl: './user-profil.component.css'
})
export class UserProfilComponent implements OnInit{
  protected id !: number ;
  protected Employee !: EmployeeModel2 ;
  protected salaire :number = 0;
  protected task : number = 0
  protected  absence: number = 0;
 protected  isLoading!  : boolean  ;


  public user!: {email : string , role : string};
  protected selectedFile!: any ;

  constructor(
      private serviceEmployeeService : EmployeeService ,
      private toastr : ToastrService ,
      private serviceTask : TaskService ,
      private servicePayStub : PayStubService ,
      private serviceAbsence : AbsenceService
    ) {

  }



  ngOnInit(): void {
    this.getEmployee();
  }
  getEmployee() {
    this.isLoading = true;  // Active le spinner avant de démarrer le chargement

    this.user = JSON.parse(String(localStorage.getItem("user")));
    this.serviceEmployeeService.getEmployeeByEmail(this.user.email).subscribe(data => {
      this.Employee = data;
      this.id = data.id;
      this.selectedFile = data.photo;

      // Charge les tâches
      this.serviceTask.getTaskScheduleForOne(this.id).subscribe(taskData => {
        this.task = taskData.length;
      }, error => {
        console.log(error);
        this.toastr.warning(iconApp + " nombre de tache non chargé", manager, { enableHtml: true });
      });

      // Charge le salaire
      this.servicePayStub.getPayStubForOne(String(this.Employee.email)).subscribe(salaireData => {
        this.salaire = salaireData.amount;
      }, error => {
        this.toastr.warning(iconApp + "  salaire non chargé", manager, { enableHtml: true });
      });

      // Charge les absences
      this.serviceAbsence.searchAbsence(String(this.Employee.email)).subscribe(absenceData => {
        this.absence = absenceData.length;
        this.isLoading = false;  // Désactive le spinner lorsque toutes les données sont chargées
      }, error => {
        console.log(error);
        this.toastr.warning(iconApp + " Nombre d'absence non chargée!!", manager, { enableHtml: true });
        this.isLoading = false;  // Désactive également en cas d'erreur
      });
    }, error => {
      console.log(error);
      this.toastr.warning(iconApp + " nombre de données non chargé", manager, { enableHtml: true });
      this.isLoading = false;  // Désactive le spinner en cas d'erreur
    });
  }


  updateUser(){

    localStorage.setItem("photo" , this.selectedFile != null ? this.selectedFile : null);
    if(typeof this.selectedFile  == "string"){


      const base64String = this.selectedFile;
      const binaryString = atob(base64String); // atob décode la chaîne base64 en chaîne binaire

// 2. Convertir la chaîne binaire en tableau d'octets
      const byteArray = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        byteArray[i] = binaryString.charCodeAt(i); // Conversion de chaque caractère en son code UTF-16
      }

// 3. Créer un Blob à partir du tableau d'octets
      const blob = new Blob([byteArray], { type: 'application/octet-stream' });

// 4. Créer un Fichier à partir du Blob
      this.selectedFile = new File([blob], "nomDuFichier.extension", {type: 'application/octet-stream'}) ;
    }
    this.isLoading = false
    this.serviceEmployeeService.updateEmployee(
          this.id ,
      {
        email  : this.Employee.email ,
        address : this.Employee.address ,
        phone : this.Employee.phone ,
        name : this.Employee.name,
        surname : this.Employee.surname ,
        birthday : this.Employee.birthday ,
        position : this.Employee.position.id ,


      },this.selectedFile
    ).subscribe(data =>{
          this.refreshDataUser(data);
          console.log(data);
          this.selectedFile = data.photo
          this.isLoading = false
          this.toastr.success(iconApp+" mise à jour fait avec succès" , "EMPLOYEE MANAGER",{enableHtml:true});
    } ,error => {
      console.log(error);
      this.toastr.error(iconApp+" mise à jour n'a pas été faite veuillez réessayer plutard!!" , "EMPLOYEE MANAGER",{enableHtml:true});
      this.isLoading = false
    });
    this.isLoading = false;

  }



  refreshDataUser(data : EmployeeModel){
      this.Employee = {
          email  : data.email,
          name : data.name,
          surname : data.surname,
          phone : data.phone ,
          birthday : data.birthday ,
          address : data.address,
        position : data.position ,
        photo : data.photo
      }
  }

  getImageUrl(photo: any) {
    return `data:image/jpg;base64,${photo}`;
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0]   ;

  }
}
