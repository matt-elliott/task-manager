import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Task } from '../../models/task.model';
import { addTask } from '../../state/task.actions';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss'
})
export class TaskFormComponent {

  constructor(private store: Store<{ tasks: Task[] }>) { }

}
