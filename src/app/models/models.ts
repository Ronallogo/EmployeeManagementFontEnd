



export interface PositionModel {
  "id":number ,
  "position_name":string,
  "position_description":string
}


export interface TaskModel {
  "id":number ,
  "task_name":string,
  "task_description":string
}

export interface TaskInsertedModel {

  "id":number ,
  "task":number   ,
  "position":number ,
  "date":string ,
  "gain":number
}

export interface TaskInsertedModel2 extends TaskInsertedModel {
      task : any,
      position : any,

}

export function   getTodayDate(): string {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}


export interface ContenuModel{
    id  : number;
   title : string ;
   theme : string |null;
   nature : string |null;
   language :string |null;
   creation_date :string |null;
   status : string |null;

}

export interface ContenuModel2 extends ContenuModel {
    id : number

}
export interface ContenuModel2 {
  title : string  ;
  theme : string | null;
  nature : string | null;
  language : string | null;
  creation_date : string | null;
  status : string | null;
}

export interface EmployeeModel extends EmployeeModel2{
    id : number;
}

export interface EmployeeModel6 extends EmployeeModel {
  user :any ;
}

export interface EmployeeModel2 {
  name :string | null ;
  surname : string | null;
  email : string | null;
  birthday : string| null;
  phone : number |null;
  address : string |null;
  position : any |null;
  photo : any |null;

}
export interface EmployeeModel4 {
  name :string | null ;
  surname : string | null;
  email : string | null;
  birthday : string| null;
  phone : number |null;
  address : string |null;
  position : any |null;


}


export interface EmployeeModel3 extends  EmployeeModel5{
  "id" : number,


}

export function imageConvert(image : string) {



  const binaryString = atob(image); // atob décode la chaîne base64 en chaîne binaire

// 2. Convertir la chaîne binaire en tableau d'octets
    const byteArray = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      byteArray[i] = binaryString.charCodeAt(i); // Conversion de chaque caractère en son code UTF-16
    }

// 3. Créer un Blob à partir du tableau d'octets
    const blob = new Blob([byteArray], { type: 'application/octet-stream' });

// 4. Créer un Fichier à partir du Blob
  return new File([blob], "nomDuFichier.extension", {type: 'application/octet-stream'}) ;

}




export interface EmployeeModel5  {

  "name" :string ,
  "surname" : string ,
  "email" : string ,
  "birthday" : string,
  "phone" : number ,
  "address" : string ,
  "position" : any,
  "old_password" : string ,
  new_password : string ,
  "photo" : any
}



export interface AbsenceModel2 {
  date : string ;
  reason : string  ;
  employee : any  ;
}
export interface AbsenceModel extends AbsenceModel2{
    id : number;
}


export interface CongeModel2{
  beginning : string ;
  end : string ;
  type : string ;
  status : boolean ;
  timeOffApply : any


}

export interface CongeModel extends CongeModel2{
  id  : number;
}

export const iconApp  = `<i class="nc-icon nc-chart-bar-32 "></i>`;



export interface TaskScheduled {
    taskInserted : any ;
    employee : any ;
    beginning : string;
    end :string ;
    status :boolean;
    content : any;
}

export interface TaskScheduled2 extends  TaskScheduled {
    id : number;
}


export const manager  = "EMPLOYEE MANAGER";



export interface PayStubModel{


  amount : number;
  nbrTasks : number;
  bonus : number ;
  paymentDate : string;
  employee : any;
}
export interface PayStubModel2 extends PayStubModel{
    id : number;
}


export  interface UserDetails  {
  id :number;
  firstname :string;
  lastname :string;
  email : string;
  password  : string;
  role : string;
}
export  interface UserDetails2  {
  id :number;
  firstname :string;
  lastname :string;
  email : string;

  role : string;
}

export interface   DemandeConge {

  id : number ;
  beginning : string ;
  end  : string;
  employee : any ;
  type :string;
  apply : string ;
  validate : boolean;


}

export interface  DemandeConge2{

  beginning : string ;
  end  : string;
  employee : number ;
  type :string;
  apply : string ;
  validate : boolean;
}






