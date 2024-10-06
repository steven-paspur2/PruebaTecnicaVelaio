import { Component, OnInit } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Router } from '@angular/router';
import { Task} from 'src/app/models/task.model';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-lista-tareas',
  templateUrl: './lista-tareas.component.html',
  styleUrls: ['./lista-tareas.component.css']
})
export class ListaTareasComponent implements OnInit {

  tasks: Task[] = [];
  filter: 'all' | 'completed' | 'pending' = 'all';

  constructor(
    private taskService: TaskService,
    private router: Router
  ) {}

  ngOnInit() {
    this.taskService.getTasks().subscribe((tasks) => {
      this.tasks = tasks;
    });
  }

  setFilter(filter: 'all' | 'completed' | 'pending'): void {
    this.filter = filter;
  }


  filterTasks(): Task[] {
    if (this.filter === 'completed') {
      return this.tasks.filter(task => task.completed);
    } else if (this.filter === 'pending') {
      return this.tasks.filter(task => !task.completed);
    }
    return this.tasks;
  }

  toggleCompletion(taskId: number) {
    this.taskService.toggleTaskCompletion(taskId);
  }

  redirectToCreateTask() {
    try {
      this.router.navigate(['/crear-tarea']);
    } catch (error) {
      console.error('Error al navegar a crear-tarea:', error);
    }
  }

  onTabChange(event: MatTabChangeEvent) {
    if (event.tab.textLabel === 'Todas') {
      this.setFilter('all');
    } else if (event.tab.textLabel === 'Completadas') {
      this.setFilter('completed');
    } else if (event.tab.textLabel === 'Pendientes') {
      this.setFilter('pending');
    }
  }

}
