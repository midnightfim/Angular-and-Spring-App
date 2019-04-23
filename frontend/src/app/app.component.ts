import { Component } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


/**
 * AppComponent - главный компонент приложения
 * Включает в себя:
 * - Меню приложения, сделанное с помощью Material
 * - Роутинг приложения
 */


export class AppComponent {


  constructor(private router: Router) {}

  toHomePage() {
    this.router.navigate(['']);
  }

  toToDoList() {
    this.router.navigate(['/todo']);
  }
}
