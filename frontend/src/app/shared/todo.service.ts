import {Task} from './task';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';


/*
todoService - сервис приложения angular
В нем реализовано:
-работа с данными приложения
-отправка POST, GET, DELETE запросов на сервер
*/

@Injectable()
export class TodoService {
  constructor(private http: HttpClient) {

  }
  // определяем массив tasks
  tasks: Task[] = [];
  response: any;

  // вспомогательный метод для обработки сообщений с сервера
  static parseResponse(idReq: number, textReq: string, completedReq: string): Task {
    if (completedReq !== 'y') {
      return new Task(idReq, textReq, false);
    } else {
      return new Task(idReq, textReq, true);
    }
  }

  // оотправляет POST запрос на localhost:5001/todo с текстом задачи в виде JSON. В ответ получает JSON текст задачи с id
  // добавляет ответ сервера в массив tasks
  add(text: string) {
    this.http.post('http://localhost:5001/todo',
      {title: text, completed: 'n'},
      {headers: new HttpHeaders({'Content-Type': 'application/json'})}).subscribe(
      (response) => {
        this.response = response;
        this.tasks.push(TodoService.parseResponse(this.response.id, this.response.text, this.response.completed));
        },
      error => console.log(error)
    );
  }

  // оотправляет DELETE запрос на localhost:5001/todo/id.
  // удаляет Task из массива Tasks по id
  delete(task: Task) {
    this.http.delete('http://localhost:5001/todo/' + task.id).subscribe(
      () => {
      },
      error => console.log(error)
    );
    for (let t of this.tasks) {
      if (t.id === task.id) {
        this.tasks.splice(this.tasks.indexOf(t), 1);
      }
    }
  }

  // завершает задачу
  toggle(task: Task) {
    task.completed = !task.completed;
  }


  // оотправляет GET запрос на localhost:5001/todo. В ответ получает объект JSON со всеми задачами в базе данных
  // добавляет все задачи в массив tasks
  getTodos(): Task[] {
    try {
      this.http.get('http://localhost:5001/todo')
        .subscribe((response) => {
          this.response = response;
          for (const resp of this.response) {
            this.tasks.push(TodoService.parseResponse(resp.id, resp.text, resp.completed));
          }
        });
    } catch (e) {
      console.log(e);
    }
    return this.tasks;
  }


}
