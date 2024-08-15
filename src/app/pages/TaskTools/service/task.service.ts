import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {TaskInsertedModel, TaskModel} from "../../../models/models";
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
  private Task!: TaskModel;

  private TaskInserted! : TaskInsertedModel ;
  private formattedDate!: string;
   private date!: Date;



  constructor(
    private http: HttpClient
  ) { }

  createTaskInserted(task: {
    task : number |null ,
    position : number | null ,
    date_insertion : string | null,
    gain_task_post : number |null
  }){
        return this.http.post(this.Url2+"/create", task);
  }

  allTasks(): Observable<TaskModel[]> {
    return  this.http.get<any>(this.Url + '/all');
  }

  allTasksInserted(): Observable<TaskInsertedModel[]> {
    return  this.http.get<any>(this.Url2 + '/all');
  }

  deleteTask(id: number) : Observable<any> {
    return   this.http.delete(this.Url + '/delete/' + id);

  }
  deleteTaskInserted(id: number) : Observable<any> {
    return   this.http.delete(this.Url2 + '/delete/' + id);

  }

  getTask() : TaskModel {
    console.log(this.Task + "give")
    return this.Task
  }
  getTaskInserted() : TaskInsertedModel {
    console.log(this.TaskInserted + "give")
    return this.TaskInserted
  }
  setTask(Task : TaskModel){
    this.Task = Task;
    console.log(Task + " receive")
  }

  setTaskInserted(Task : TaskInsertedModel){
    this.TaskInserted = Task;
    console.log(Task + " receive")
  }

  updateTask(id : number, Task :  {task_name : string, task_description : string } ){
    return this.http.put(this.Url + '/edit/'+id , Task)
  }


  createTask(Task : {task_name : string |null , task_description : string | null} ){
    return this.http.post(this.Url + '/create', Task)
  }


  searchTask(keyword : string) : Observable<any>{
    return this.http.get(this.Url + '/search/' + keyword )
  }

  updateTaskInserted(id: number , taskInserted: {
    task : number |null ,
    position : number | null ,
    date_insertion : string | null,
    gain_task_post : number |null
  }) {


    return this.http.put(this.Url2 + '/edit/'+`${id}`, taskInserted)

  }
}
