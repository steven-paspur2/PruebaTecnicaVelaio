import { Injectable, OnInit } from '@angular/core';
import { Task } from '../models/task.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})export class TaskService {

  tasks: Task[] = [];
  filter: 'all' | 'completed' | 'pending' = 'all';
  private tasksSubject = new BehaviorSubject<Task[]>(this.tasks);

  constructor() {
    // Crear algunas tareas de ejemplo
    const exampleTasks: Task[] = [
      {
        id: 1,
        title: 'Tarea 1',
        completed: false,
        people: [
          { id: 1, fullName: 'Juan Pérez', age: 30, skills: ['HTML', 'CSS'] },
          { id: 2, fullName: 'Ana Gómez', age: 25, skills: ['JavaScript', 'Angular'] }
        ]
      },
      {
        id: 2,
        title: 'Tarea 2',
        completed: true,
        people: [
          { id: 1, fullName: 'Carlos Rodríguez', age: 35, skills: ['Java', 'Spring Boot'] }
        ]
      },
      {
        id: 3,
        title: 'Tarea 3',
        completed: false,
        people: [
          { id: 1, fullName: 'Luisa Fernanda', age: 28, skills: ['React', 'Redux'] }
        ]
      }
    ];

    // Agregar las tareas de ejemplo al servicio
    exampleTasks.forEach(task => this.addTask(task));
  }

  // Método para agregar una tarea
  addTask(task: Task) {
    this.tasks.push(task);
    this.tasksSubject.next(this.tasks);
  }

  // Método para obtener tareas como observable
  getTasks() {
    return this.tasksSubject.asObservable();
  }

  // Método para establecer el filtro
  setFilter(filter: 'all' | 'completed' | 'pending'): void {
    this.filter = filter;
  }

  // Método para filtrar las tareas
  filterTasks(): Task[] {
    if (this.filter === 'completed') {
      return this.tasks.filter(task => task.completed);
    } else if (this.filter === 'pending') {
      return this.tasks.filter(task => !task.completed);
    }
    return this.tasks;
  }

  // Método para alternar el estado de una tarea
  toggleTaskCompletion(taskId: number) {
    const task = this.tasks.find(task => task.id === taskId);
    if (task) {
      task.completed = !task.completed;
      this.tasksSubject.next(this.tasks);
    }
  }
}
