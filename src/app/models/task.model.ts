import { Persona } from "./persona.model";

export class Task {
  id!: number;
  title: string | undefined;
  completed: boolean | undefined;
  people: Persona[] | undefined;
}
