import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Task } from '../../models/task.model';
import { addTask, loadTasks } from '../../state/task.actions';
import { TaskDetailComponent } from '../task-detail/task-detail.component';
import { selectTasks } from '../../state/task.selectors';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [TaskDetailComponent],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
})
export class TaskListComponent {
  destroy$ = new Subject<void>();
  tasks$: Observable<Task[]>;

  tasks: Task[] = [];

  constructor(private store: Store<{ tasks: Task[] }>) {
    this.tasks$ = this.store.select((state) => state.tasks);
    this.store.dispatch(loadTasks());
  }

  ngOnInit() {
    this.tasks$.pipe(takeUntil(this.destroy$)).subscribe((data: any) => {
      this.tasks = data.tasks;
      console.info('New Tasks received:', data);
    });
  }

  addNewTask() {
    this.store.dispatch(addTask({ task: this.createEmptyTask() }));
    //TODO THIS SHOULD BE IN A NGRX EFFECT
    window.sessionStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  private createEmptyTask() {
    return {
      id: Date.now().toString(),
      title: '',
      description: '',
      completed: false,
      status: 'new',
    };
  }
}
