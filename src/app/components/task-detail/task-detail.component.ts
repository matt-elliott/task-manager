import { Component, Input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Task } from '../../models/task.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { editTask } from '../../state/task.actions';

@Component({
  selector: 'app-task-detail',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './task-detail.component.html',
  styleUrl: './task-detail.component.scss'
})
export class TaskDetailComponent {
  @Input() task!: Task;
  //? Creating a form group with an empty form control for each task property so the user can immediately start making todos
  formGroup: FormGroup = new FormGroup({
    title: new FormControl(
      {
        value: this.task?.title,
        disabled: true
      },
      [
        Validators.required
      ]
    ),
    description: new FormControl({
      value: this.task?.description,
      disabled: true
    }),
    completed: new FormControl({
      value: this.task?.completed,
      disabled: true
    }),
    status: new FormControl({
      value: this.task?.status,
      disable: true
    }, [Validators.required]),
    dueDate: new FormControl({
      value: this.task?.dueDate,
      disabled: true
    })
  });

  isEditing = false;
  // TODO MOVE TO CONSTANTS FILE
  statuses = ['New', 'In Progress', 'Review', 'Completed'];

  constructor(private store: Store) { }

  toggleCompleted() {
    this.task.completed = !this.task.completed;

    //TODO UPDATE STATE WITH COMPLETED STATUS
  }

  toggleEnabled() {
    Object.keys(this.formGroup.controls).forEach(controlName => {
      if (this.isEditing) {
        this.formGroup.get(controlName)?.enable();
      } else {
        this.formGroup.get(controlName)?.disable();
      }
    });
  }

  editTask() {
    this.isEditing = true;
    this.toggleEnabled();
  }

  saveTask() {
    const formValues = { ...this.formGroup.value, id: this.task.id };
    console.debug('formValues', formValues);
    this.store.dispatch(editTask({ task: formValues }));
    this.isEditing = false;
    this.toggleEnabled()
  }

  deleteTask() {
    this.store.dispatch({
      type: '[Task List] Delete Task',
      task: this.task
    });
  }
}
