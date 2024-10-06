import { Component, OnInit } from '@angular/core';
import { UntypedFormArray, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-tareas-formulario',
  templateUrl: './tareas-formulario.component.html',
  styleUrls: ['./tareas-formulario.component.css']
})
export class TareasFormularioComponent implements OnInit {
  taskForm!: UntypedFormGroup;

  constructor(
    private fb: UntypedFormBuilder,
    private taskService: TaskService,  // Inyectar el TaskService
    private router: Router             // Inyectar el Router para redirigir
  ) {}

  ngOnInit(): void {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      deadline: ['', Validators.required],
      people: this.fb.array([]),
    });
  }

  get people(): UntypedFormArray {
    return this.taskForm.get('people') as UntypedFormArray;
  }

  getSkills(personIndex: number): UntypedFormArray {
    return this.people.at(personIndex).get('skills') as UntypedFormArray;
  }

  addPerson() {
    const personForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(5)]],
      age: [null, [Validators.required, Validators.min(18)]],
      skills: this.fb.array([this.fb.control('', Validators.required)])
    });
    this.people.push(personForm);
  }

  addSkill(personIndex: number) {
    this.getSkills(personIndex).push(this.fb.control('', Validators.required));
  }

  removeSkill(personIndex: number, skillIndex: number) {
    this.getSkills(personIndex).removeAt(skillIndex);
  }

  removePerson(index: number) {
    this.people.removeAt(index);
  }

  submit() {
    if (this.taskForm.valid) {
      // Obtener los datos del formulario y agregarlos como una nueva tarea
      const newTask = this.taskForm.value;
      newTask.id = Date.now();  // Generar un ID único usando la fecha actual
      newTask.completed = false; // Si quieres establecer un estado por defecto

      this.taskService.addTask(newTask);  // Agregar la tarea usando el servicio

      // Redirigir a la lista de tareas después de guardar
      this.router.navigate(['/lista-tareas']);

      // Limpiar el formulario
      this.taskForm.reset();
    }
  }
}
