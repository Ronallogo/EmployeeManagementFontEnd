


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
  "task":number  ,
  "position":number ,
  "date":string ,
  "gain":number
}
export interface TaskInsertedModel2 {

  "id":number ,
  "task":number  ,
  "position":number ,
  "date": Date ,
  "gain":number
}

export interface ContenuModel{
    id  : number;
   title : string ;
   theme : string ;
   nature : string ;
   language : string ;
   creation_date : string ;
   status : string ;

}
export interface ContenuModel2 {
  title : string | null ;
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

}


