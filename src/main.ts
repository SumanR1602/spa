import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { Task } from './app/models/task.model';
import { TaskInputComponent } from './app/components/task-input/task-input.component';
import { TaskListComponent } from './app/components/task-list/task-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TaskInputComponent, TaskListComponent],
  template: `
    <div class="container">
      <h1>To-Do List</h1>
      
      <app-task-input (create)="addTask($event)"></app-task-input>

      <app-task-list
        title="Pending Tasks"
        [tasks]="getPendingTasks()"
        (toggle)="toggleTask($event)"
        (delete)="deleteTask($event)"
      ></app-task-list>

      <app-task-list
        title="Completed Tasks"
        [tasks]="getCompletedTasks()"
        (toggle)="toggleTask($event)"
        (delete)="deleteTask($event)"
      ></app-task-list>
    </div>
  `,
  styles: [`
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      font-family: Arial, sans-serif;
    }

    h1 {
      color: #333;
      text-align: center;
    }
  `]
})
export class App {
  tasks: Task[] = [];

  addTask(title: string) {
    const newTask: Task = {
      id: Date.now(),
      title,
      completed: false
    };
    this.tasks = [...this.tasks, newTask];
  }

  toggleTask(task: Task) {
    this.tasks = this.tasks.map(t => 
      t.id === task.id ? { ...t, completed: !t.completed } : t
    );
  }

  deleteTask(task: Task) {
    this.tasks = this.tasks.filter(t => t.id !== task.id);
  }

  getPendingTasks(): Task[] {
    return this.tasks.filter(task => !task.completed);
  }

  getCompletedTasks(): Task[] {
    return this.tasks.filter(task => task.completed);
  }
}

bootstrapApplication(App);