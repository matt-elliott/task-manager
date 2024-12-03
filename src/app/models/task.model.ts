export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  status?: string; // 'new' | 'in-progress' | 'completed';
  dueDate?: Date;
}