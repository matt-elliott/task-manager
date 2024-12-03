// Create, Read, Update, Delete

import { createAction, props } from '@ngrx/store';
import { Task } from '../models/task.model';

export const loadTasks = createAction(
  '[Task] Load Tasks'
);

export const loadTasksSuccess = createAction(
  '[Task] Load Tasks Success',
  props<{ data: Task[] }>()
);

export const loadTasksFailure = createAction(
  '[Task] Load Tasks Failure',
  props<{ error: any }>()
);

export const addTask = createAction(
  '[Task List] Add Task',
  props<{ task: Task }>()
);

export const editTask = createAction(
  '[Task List] Edit Task',
  props<{ task: Task }>()
);

export const deleteTask = createAction(
  '[Task List] Delete Task',
  props<{ task: Task }>()
);