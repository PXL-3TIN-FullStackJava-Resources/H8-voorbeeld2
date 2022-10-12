import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from 'src/app/shared/models/todo.model';
import { TodoService } from 'src/app/shared/services/todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  @Input() todoList$!: Observable<Todo[]>;
  @Output() dataChanged: EventEmitter<any> = new EventEmitter();

  editing: boolean = false;
  editingItem!: Todo;
  name: string = '';


  constructor(private ts: TodoService) { }

  ngOnInit(): void {
   
  }

  delete(item: Todo): void{
    this.ts.removeTodo(item).subscribe(_ => this.dataChanged.emit());
  }

  edit(item : Todo): void{
    this.editing = true;
    this.editingItem = item;
  }

  saveEdit(): void{
    this.ts.updateTodo(this.editingItem!).subscribe(_ => {
      this.editing = false;
      this.editingItem = {id: 0, name: ''};
    });
   
  }

  todoClick(item: Todo): void{
    this.ts.getTodo(item.id).subscribe(data => alert(data.name));
  }

  search(searchTerm: string): void{
    this.todoList$ = this.ts.getTodos(searchTerm);
  }

}
