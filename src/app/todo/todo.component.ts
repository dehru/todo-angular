import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Todo } from '../models';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  @Input()
  todo!: Todo;

  @Output()
  delete: EventEmitter<Todo> = new EventEmitter<Todo>();
  
  constructor() { }

  ngOnInit(): void {
  }

  handleDelete(todo: Todo) {
    this.delete.emit(todo);
  }

}
