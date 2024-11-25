import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="task-list">
      <h2>{{ title }}</h2>
      <ul>
        @for (task of tasks; track task.id) {
          <li [class.completed]="task.completed">
            <input 
              type="checkbox" 
              [checked]="task.completed"
              (change)="toggle.emit(task)"
            >
            <span>{{ task.title }}</span>
            <button (click)="delete.emit(task)">Delete</button>
          </li>
        }
      </ul>
    </div>
  `,
  styles: [`
    ul {
      list-style: none;
      padding: 0;
    }

    li {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 8px;
      border-bottom: 1px solid #eee;
    }

    li button {
      background-color: #f44336;
      color: white;
      border: none;
      border-radius: 4px;
      padding: 8px 16px;
      cursor: pointer;
      margin-left: auto;
    }

    li button:hover {
      background-color: #da190b;
    }

    .completed span {
      text-decoration: line-through;
      color: #888;
    }
  `]
})
export class TaskListComponent {
  @Input() title!: string;
  @Input() tasks: Task[] = [];
  @Output() toggle = new EventEmitter<Task>();
  @Output() delete = new EventEmitter<Task>();
}