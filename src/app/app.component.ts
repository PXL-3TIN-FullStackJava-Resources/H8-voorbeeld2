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
  todoList$!: Observable<Todo[]>;
  editing: boolean = false;
  editingItem: Todo | null = null;
  name: string = '';

  constructor(private ts: TodoService) { }

  ngOnInit(): void {
    this.fetchList();
  }

  fetchList(): void{
    this.todoList$ = this.ts.getTodos();
  }

  add(form: any): void{
    this.ts.addTodo({name: form.value.name}).subscribe(_ => {
      this.fetchList()
      form.reset();
    });
  }

  delete(item: Todo): void{
    this.ts.removeTodo(item).subscribe(_ => this.fetchList());
  }

  edit(item : Todo): void{
    this.editing = true;
    this.editingItem = item;
  }

  saveEdit(): void{
    this.ts.updateTodo(this.editingItem!).subscribe(_ => {
      this.editing = false;
      this.editingItem = null;
    });
   
  }

  todoClick(item: Todo): void{
    this.ts.getTodo(item.id).subscribe(data => alert(data.name));
  }

  search(searchTerm: string): void{
    this.todoList$ = this.ts.getTodos(searchTerm);
  }

}
