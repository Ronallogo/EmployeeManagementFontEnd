


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

export interface EmployeeModel2 {
  name :string | null ;
  surname : string | null;
  email : string | null;
  birthday : string| null;
  phone : number |null;
  address : string |null;
  position : any |null;

}


export interface AbsenceModel2 {
  date : string ;
  reason : string  ;
  employee : string  ;
}
export interface AbsenceModel extends AbsenceModel2{
    id : number;
}

export interface CongeModel2{
  date_beginning : string ;
  date_end : string ;
  type : string ;
  status : boolean ;
  time_off_apply : number


}

export interface CongeModel extends AbsenceModel2{
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



