import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Todo } from './../models/todo.model';
import { Observable } from 'rxjs';

@Injectable()
export class TodoService {
    apiurl: string = 'api/todo';
    constructor(private http: HttpClient) { }

    getTodos(searchText?: string): Observable<Todo[]> {
        if (!searchText)
            return this.http.get<Todo[]>(this.apiurl);
        else {
            searchText = searchText.trim();
            const options = { params: new HttpParams().set('name', searchText) };

            return this.http.get<Todo[]>(this.apiurl, options);
        }
    }

    getTodo(id: number): Observable<Todo> {
        return this.http.get<Todo>(`${this.apiurl}/${id}`);
    }

    addTodo(item: Object): Observable<Todo> {
        return this.http.post<Todo>(this.apiurl, item);
    }

    removeTodo(item: Todo): Observable<any> {
        return this.http.delete(`${this.apiurl}/${item.id}`);
    }

    updateTodo(item: Todo): Observable<Todo> {
        return this.http.put<Todo>(this.apiurl, item);
    }


}