import { Component, OnInit } from '@angular/core';
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
    // Cargar tareas desde el servicio
    this.taskService.getTasks().subscribe((tasks) => {
      this.tasks = tasks;
    });
  }

  // Método para cambiar el filtro
  setFilter(filter: 'all' | 'completed' | 'pending'): void {
    this.filter = filter;
  }

  // Método para filtrar tareas por estado
  filterTasks(): Task[] {
    if (this.filter === 'completed') {
      return this.tasks.filter(task => task.completed);
    } else if (this.filter === 'pending') {
      return this.tasks.filter(task => !task.completed);
    }
    return this.tasks;
  }

  // Alternar el estado de completado de una tarea
  toggleCompletion(taskId: number) {
    this.taskService.toggleTaskCompletion(taskId);
  }

  redirectToCreateTask() {

    console.error("REDIRECCION");

    try {
      this.router.navigate(['/crear-tarea']);
    } catch (error) {
      console.error('Error al navegar a crear-tarea:', error);
    }
  }

}
