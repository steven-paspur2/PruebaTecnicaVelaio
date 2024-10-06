import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaTareasComponent } from './components/lista-tareas/lista-tareas.component';
import { TareasFormularioComponent } from './components/tareas-formulario/tareas-formulario.component';

const routes: Routes = [
  { path: 'lista-tareas', component: ListaTareasComponent },
  { path: 'crear-tarea', component: TareasFormularioComponent },
  { path: '', redirectTo: '/lista-tareas', pathMatch: 'full' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
