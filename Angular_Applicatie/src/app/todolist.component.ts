import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Http, Response }          from '@angular/http';
import { Headers, RequestOptions, URLSearchParams } from '@angular/http';

export class ToDo{
  todoId:number;
  note:string;
}

@Component({
  moduleId: module.id,
  selector: 'todolist',
  templateUrl:'./todolist.component.html',
  styleUrls:['./todolist.component.css']
})

export class TodoListComponent implements OnInit{
  private gettodoUrls= "http://87.195.159.225:8081/apiV1/gettodos";
  private addTodoUrl= "http://87.195.159.225:8081/apiV1/addtodo";

  private todos :ToDo[];
  constructor(
    private route:ActivatedRoute,
    private router:Router,
    private http:Http
  ){}

  ngOnInit() {
    this.getToDos();
  }

  getToDos(){
    console.log("trying to retrieve todos from server..");
    let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
    let options = new RequestOptions({headers:headers});
    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('userId', '0');
    urlSearchParams.append('serverKey', '175d6c2c2632e0f87a07f32e88a690104f921b517c7af1c6333de2dfad9be8e3');
    let body = urlSearchParams.toString();

    return this.http.post(this.gettodoUrls, body, options).subscribe(
        data  =>this.handleToDos(data),
        err   =>this.handleError(err),
        () =>console.log("Register request complete")
    )
  }

  handleToDos(data:Response){
    console.log(data['_body']);
    var objs = JSON.parse(data['_body']);
    console.log(objs);

    this.todos = objs;
  }

  handleError(error: Response){
    console.info(error.toString());
  }

  addTodo(note: string){
    console.log(note);
    console.log("trying to add todo to sserver..");
    let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
    let options = new RequestOptions({headers:headers});
    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('userId', '0');
    urlSearchParams.append('todo', note);
    urlSearchParams.append('serverKey', '175d6c2c2632e0f87a07f32e88a690104f921b517c7af1c6333de2dfad9be8e3');
    let body = urlSearchParams.toString();

    return this.http.post(this.addTodoUrl, body, options).subscribe(
        data  =>this.handleAddedTodo(data),
        err   =>this.handleError(err),
        () =>console.log("Register request complete")
    )
  }

  handleAddedTodo(data: Response){
    console.log(data);
    this.getToDos();
  }
}
