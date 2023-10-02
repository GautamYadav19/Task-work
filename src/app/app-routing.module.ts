import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateFormComponent } from './components/create-form/create-form.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { EditTaskComponent } from './components/edit-task/edit-task.component';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
  },
  { path: 'home/createtask', component: CreateFormComponent },
  { path: 'home/list', component: TaskListComponent },
  { path: 'home/task/edit/:id', component: EditTaskComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
