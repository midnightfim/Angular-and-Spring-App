import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ToDoComponent} from './to-do/to-do.component';


const routes: Routes = [{ path: 'todo', component: ToDoComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
