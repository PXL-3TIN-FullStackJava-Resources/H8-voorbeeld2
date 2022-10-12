import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Todo } from '../models/todo.model';

@Injectable()
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const todo = [
      { id: 1, name: 'todo item 1' },
      { id: 2, name: 'todo item 2' },
      { id: 3, name: 'todo item 3' },
    ];
    return { todo };
    
  }

  // Bij een lege array kan de mock service geen ID geneneren
  // daarom overwriten we deze methode om ervoor te zorgen dat 
  // onze todos altijd een id krijgen.
  genId(todos: Todo[]): number {
    return todos.length > 0 ? todos.length + 1 : 1;
  }
}