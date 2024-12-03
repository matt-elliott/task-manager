import { createSelector } from "@ngrx/store";
import { Task } from "../models/task.model";

// TODO - Get tasks from local storage - create a service for this
const initialState: any = {
  tasks: []
};

export const selectAllTasks = () => initialState.tasks;

export const selectTasks = createSelector(
  selectAllTasks,
  (tasks: Task[]) => tasks
);

export const selectTask = (id: string) => createSelector(
  selectAllTasks,
  (tasks: Task[]) => tasks.find(task => task.id === id)
);
