import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Todo } from 'src/app/shared/models/todo.model';
import { TodoService } from 'src/app/shared/services/todo.service';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.css']
})
export class AddTodoComponent implements OnInit {
  name: string = '';
  @Output() newItemAdded: EventEmitter<any> = new EventEmitter();
  constructor(private ts: TodoService) { }

  ngOnInit(): void {
  }

  add(form: any): void{
    const newItem: Todo = {name: form.value.name};
    this.ts.addTodo(newItem).subscribe(_ => {
      console.log("item added");
      this.newItemAdded.emit(newItem);
      form.reset();
    });
  }

}
