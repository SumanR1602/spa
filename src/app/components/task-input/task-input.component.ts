import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-input',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="add-task">
      <input 
        type="text" 
        [(ngModel)]="newTaskTitle" 
        (keyup.enter)="addTask()"
        placeholder="Add new task..."
      >
      <button (click)="addTask()">Add Task</button>
    </div>
  `,
  styles: [`
    .add-task {
      display: flex;
      gap: 10px;
      margin-bottom: 20px;
    }

    input {
      flex: 1;
      padding: 8px;
      border: 1px solid #ddd;
      border-radius: 4px;
    }

    button {
      padding: 8px 16px;
      background-color: #4CAF50;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }

    button:hover {
      background-color: #45a049;
    }
  `]
})
export class TaskInputComponent {
  @Output() create = new EventEmitter<string>();
  newTaskTitle = '';

  addTask() {
    if (this.newTaskTitle.trim()) {
      this.create.emit(this.newTaskTitle);
      this.newTaskTitle = '';
    }
  }
}