import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {TaskInsertedModel2, TaskModel, TaskScheduled, TaskScheduled2} from "../../../models/models";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {TaskInsertionListComponent} from "../task_insertion/task-insertion-list/task-insertion-list.component";
import {formatDate} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private Url : string = environment.host+"/task"
  private Url2 : string = environment.host+"/taskInserted"
  private Url3 : string = environment.host+"/TaskScheduled"
  private Task!: TaskModel;
  private TaskScheduled !: TaskScheduled2

  private TaskInserted! : TaskInsertedModel2 ;
  private formattedDate!: string;
   private date!: Date;



  constructor(
    private http: HttpClient
  ) {}

  createTaskInserted(task:  any){
        return this.http.post(this.Url2+"/create", task);
  }

  allTasks(): Observable<TaskModel[]> {
    return  this.http.get<any>(this.Url + '/all');
  }

  allTasksInserted(): Observable<TaskInsertedModel2[]> {
    return  this.http.get<any>(this.Url2 + '/all');
  }

  allTasksInsertedForOnePosition(position : number): Observable<TaskInsertedModel2[]> {
    return  this.http.get<any>(this.Url2 + '/allForOnePosition/'+position);
  }

  deleteTask(id: number) : Observable<any> {
    return   this.http.delete(this.Url + '/delete/' + id);

  }
  deleteTaskInserted(id: number) : Observable<any> {
    return   this.http.delete(this.Url2 + '/delete/' + id);

  }
  deleteTaskScheduled(id: number) : Observable<any> {
    return   this.http.delete(this.Url3 + '/delete/' + id);

  }

  getTask() : TaskModel {
    console.log(this.Task + "give") ;
    if(this.Task == undefined) window.location.replace("http://localhost:4200/#/task-list");
    return this.Task
  }
  getTaskInserted() : TaskInsertedModel2 {
    console.log(this.TaskInserted + "give")
    return this.TaskInserted
  }
  setTask(Task : TaskModel){
    this.Task = Task;
    console.log(Task + " receive")
  }

  setTaskInserted(Task : TaskInsertedModel2){
    this.TaskInserted = Task;
    console.log(Task + " receive")
  }

  updateTask(id : number, Task :  {task_name : string, task_description : string } ){
    return this.http.put(this.Url + '/edit/'+id , Task)
  }

  updateTaskScheduled(id: number, Task:  any){
    console.log(Task);
    let taskData ={
      taskInserted  : (Task.taskInserted.id != undefined) ? Task.taskInserted.id :  Task.taskInserted ,
      beginning : Task.beginning ,
      end : Task.end,
      status :  true,
      type : Task.type,
      nbrPerson : Task.nbrPerson ,
      content : (Task.content.id != undefined) ? Task.content.id : Task.content
    }
    console.log(taskData)
    return this.http.put(this.Url3 + '/edit/'+id , taskData )
  }


  createTask(Task : {task_name : string |null , task_description : string | null} ){
    return this.http.post(this.Url + '/create', Task)
  }


  searchTask(keyword : string) : Observable<any>{
    return this.http.get(this.Url + '/search/' + keyword )
  }
  searchTaskScheduledByPositionId(position_id: number) : Observable<TaskScheduled2[]>{
    return this.http.get<TaskScheduled2[]>(this.Url3 + '/searchTaskByPositionId/' + position_id )
  }

  searchTaskScheduled(keyword : string) : Observable<any>{
    return this.http.get(this.Url3 + '/searchTaskScheduled/' + keyword )
  }

  updateTaskInserted(id: number , taskInserted: {
    task : number |null ,
    position : number | null ,
    date_insertion : string | null,
    gain_task_post : number |null
  }) {
    return this.http.put(this.Url2 + '/edit/'+`${id}`, taskInserted)
  }


  getTaskScheduleForOne(id: number) : Observable<any> {
      return this.http.get(this.Url3 + '/taskForOne/'+id)
  }
  AllTaskScheduled(){
    return  this.http.get<any>(this.Url3 + '/all');
  }
  getAllTaskForOnePosition(id : number){
    return  this.http.get<any>(this.Url2 + '/allForOnePosition/' + id );
  }

  createTaskScheduled(task  :  any){
      return this.http.post(this.Url3 + '/create', task);
  }

  setTaskSchedule(p: TaskScheduled2) {
    this.TaskScheduled  = p ;
  }

  getTaskScheduled(){
    return this.TaskScheduled;
  }
  report() : Observable<any>{
    return this.http.get( "http://127.0.0.1:8080/api/auth/employee_manager/task/report/pdf" , {
      responseType: "Blob" as "json"
    });
  }
  report2() : Observable<any>{
    return this.http.get( "http://127.0.0.1:8080/api/auth/employee_manager/taskInserted/report/pdf" , {
      responseType: "Blob" as "json"
    });
  }
  report3() : Observable<any>{
    return this.http.get( "http://127.0.0.1:8080/api/auth/employee_manager/TaskScheduled/report/pdf" , {
      responseType: "Blob" as "json"
    });
  }




}
