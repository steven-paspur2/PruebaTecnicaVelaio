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


    exampleTasks.forEach(task => this.addTask(task));
  }


  addTask(task: Task) {
    this.tasks.push(task);
    this.tasksSubject.next(this.tasks);
  }

  getTasks() {
    return this.tasksSubject.asObservable();
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

  toggleTaskCompletion(taskId: number) {
    const task = this.tasks.find(task => task.id === taskId);
    if (task) {
      task.completed = !task.completed;
      this.tasksSubject.next(this.tasks);
    }
  }
}
