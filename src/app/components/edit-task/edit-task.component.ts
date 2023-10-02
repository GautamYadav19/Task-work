import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ServiceService } from '../services/service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css'],
})
export class EditTaskComponent {
  submitted = false;
  Tasks: any = [];

  constructor(
    public fb: FormBuilder,
    private actRoute: ActivatedRoute,
    private apiService: ServiceService,
    private router: Router
  ) {}

  taskForm = this.fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    status: [''],
  });
  ngOnInit() {
    let id = this.actRoute.snapshot.paramMap.get('id');
    // this.readTasks();
    this.readTasksById(id);
    // this.editTask = this.fb.group({
    //   title: [''],
    //   description: [''],
    //   status: [''],
    // });
  }
  readTasksById(id: any) {
    this.apiService.getByID(id).subscribe((data) => {
      this.taskForm.patchValue({
        title: data['title'],
        description: data['description'],
        status: data['status'],
      });
    });
  }
  editForm(id: any) {
    this.apiService.getByID(id).subscribe((data) => {
      this.apiService.updateTask(data._id, 'completed').subscribe((data) => {});
    });
  }

  onSubmit() {
    this.submitted = true;
    if (!this.taskForm.valid) {
      return false;
    } else if (window.confirm('Are you sure')) {
      let id = this.actRoute.snapshot.paramMap.get('id');
      this.apiService.updateTask(id, this.taskForm.value).subscribe({
        complete() {
          alert('update successfully!');
        },
        error: (e) => {},
      });
    }
    return true;
  }
}
