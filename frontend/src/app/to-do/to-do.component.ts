import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Task} from '../shared/task';
import {TodoService} from '../shared/todo.service';


@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.css']
})

/**
 * TodoComponent - вспомогательный компонент приложения
 * Включает в себя:
 * - UI сделанный в помощью Material компонентов(buttons, forms, cards, icons)
 * - методы для получения данных из сервиса приложения
 */

export class ToDoComponent implements OnInit {
  tasks: Task[];

  public form: FormGroup = new FormGroup({
    task: new FormControl()
  });

  addTask() {
    this.todoService.add(this.form.value.task);
    this.form.reset();
  }

  deleteTask(task: Task) {
    this.todoService.delete(task);
  }

  toggleTask(task: Task) {
    this.todoService.toggle(task);
  }

  ngOnInit() {
    this.tasks = this.todoService.getTodos();
  }

  constructor(private todoService: TodoService) {
    this.tasks = [];
  }
}
