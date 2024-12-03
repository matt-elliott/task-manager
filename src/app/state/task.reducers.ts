import { createReducer, on } from '@ngrx/store';
import { Task } from '../models/task.model';
import * as TaskActions from './task.actions';
import { merge } from 'rxjs';

//TODO MOVE TO STORAGE SERVICE
const storedTasks = sessionStorage.getItem('tasks');

export interface TaskState {
  tasks: Task[];
}

export const initialState: TaskState = {
  tasks: storedTasks ? JSON.parse(storedTasks) : []
};

export const taskReducer = createReducer(
  initialState,
  on(TaskActions.loadTasksSuccess, (state, { data }) => ({
    ...state,
    tasks: data
  })),
  on(TaskActions.addTask, (state, { task }) => ({
    ...state,
    tasks: [...state.tasks, task]
  })),
  on(TaskActions.editTask, (state, { task }) => {
    const mergedTasks = {
      ...state,
      tasks: state.tasks.map(t => { console.debug('t', t); return t.id === task.id ? task : t })
    }
    sessionStorage.setItem('tasks', JSON.stringify(mergedTasks.tasks));
    console.debug('Editing task:', task, mergedTasks);
    return mergedTasks;
  }),
  on(TaskActions.deleteTask, (state, { task }) => ({
    ...state,
    tasks: state.tasks.filter(t => t.id !== task.id)
  })
  ));