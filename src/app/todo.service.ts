import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Todo } from './models'

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  public localStorageKey: string = 'todoapp';
  public todos: BehaviorSubject<Todo[]> = new BehaviorSubject<Todo[]>([]);
  constructor() {
    this._readStorage();
    // handle todos edited in another window
    window.addEventListener("storage", () => {
      this._readStorage();
      this._save();
    }, false);
  }
  get(id: string) { return this.todos.getValue().find(todo => todo.id === id); }
  isAllCompleted() { return this.todos.getValue().every(todo => todo.completed); }
  hasCompleted() { return this.todos.getValue().some(todo => todo.completed); }
  all(filter: string) {
    if (filter === 'active') { this.todos.next(this.todos.getValue().filter(todo => !todo.completed)) }
    else if (filter === 'completed') { this.todos.next(this.todos.getValue().filter(todo => todo.completed)) }
  }
  _readStorage() {
    // this.todos.next(JSON.parse(window.localStorage.getItem(this.localStorageKey) || '[]'));
  }
  _save() {
    // window.localStorage.setItem(this.localStorageKey, JSON.stringify(this.todos.getValue()));
  }
  // MUTATE methods
  add(todo: Todo) {
    let newTodos = this.todos.getValue();
    newTodos.push({ title: todo.title, completed: false, id: "id_" + Date.now() });
    this.todos.next(newTodos);
    this._save();
  }
  remove(id: string) {
    this.todos.next(this.todos.getValue().filter(todo => todo.id !== id));
    this._save();
  }
  update(todo: Todo) {
    this.todos.next(this.todos.getValue().map(t => t.id === todo.id ? todo : t));
    this._save();
  }
}
