
export interface Habilidad {
  id?: number;
  habilidad: string;
}

export interface Avenger {
  id?: number;
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
  habilidades: string;   
}

// Errores de validación para el form
export interface AvengerFormErrors {
  nombre?: string;
  alias?: string;
  actor?: string;
  descripcion?: string;
  habilidades?: string;
}
