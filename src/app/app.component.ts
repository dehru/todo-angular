import { Component } from '@angular/core';
import { Todo } from './models';
import { TodoService } from './todo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  todoTitle = 'todo-angular';
  todos: Todo[] = [];
  constructor(private todoService: TodoService) { 
    todoService.todos.subscribe(todos => {
      this.todos = todos;
    })
  }
  addTodo(todo: Todo) {
    this.todoService.add(todo);
  }
  checkForEnterKey(e: KeyboardEvent) {
    if (e.key === 'Enter') {
      this.addTodo({id: "id_" + Date.now(), title: this.todoTitle, completed: false})
    }
  }
  removeTodo(todo: Todo) {
    this.todoService.remove(todo.id);
  }
}
