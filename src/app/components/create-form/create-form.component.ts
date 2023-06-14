import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ServiceService } from '../services/service.service';
@Component({
  selector: 'app-create-form',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.css'],
})
export class CreateFormComponent {
  submitted = false;
  Tasks: any = [];
  editTask: any = [];
  constructor(public fb: FormBuilder, private apiService: ServiceService) {}
  taskForm = this.fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    status: [''],
  });

  ngOnInit() {
    this.readTasks();
    this.editTask = this.fb.group({
      status: [''],
    });
  }
  readTasks() {
    this.apiService.getTask().subscribe((data) => {
      this.Tasks = data;
      console.log(this.Tasks);
    });
  }
  editForm(id: any) {
    console.log(id);
    this.apiService.getByID(id).subscribe((data) => {
      console.log(data, 'inside');

      this.apiService
        .updateTask(data._id, this.editTask.value)
        .subscribe((data) => {
          console.log(this.editTask.value);
          console.log(data);
        });
    });
  }
  removeTask(id: any) {
    if (window.confirm('Are you sure ?')) {
      this.apiService.deleteTask(id).subscribe((data: any) => {
        this.Tasks.splice(1);
      });
    }
  }
  onSubmit() {
    console.log(this.taskForm.value);
    this.submitted = true;
    if (!this.taskForm.valid) {
      return false;
    } else {
      return this.apiService.createTask(this.taskForm.value).subscribe({
        complete: () => {
          alert('Task added successfully');
        },
        error(e) {
          console.log(e);
        },
      });
    }
  }
}