export interface Habilidad {
  id: number;
  habilidad: string;
  avengerId: number;
}

export interface Avenger {
  id: number;
  nombre: string;
  alias: string;
  actor: string;
  descripcion: string;
  habilidades: Habilidad[];
}

export interface AvengerFormData {
  nombre: string;
  alias: string;
  actor: string;
  descripcion: string;
  habilidades: string[];
}