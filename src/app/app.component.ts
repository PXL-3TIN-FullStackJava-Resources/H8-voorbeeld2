import { Component, OnInit } from '@angular/core';
import { TodoService } from './shared/services/todo.service';
import { Observable } from 'rxjs';
import { Todo } from './shared/models/todo.model';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  todoItems$!: Observable<Todo[]>;
  constructor(private ts: TodoService) { }

  ngOnInit(): void {
    this.fetchList();
  }

  fetchList(): void{
    console.log("fetching data list");
    this.todoItems$ = this.ts.getTodos();
  }
  
}
