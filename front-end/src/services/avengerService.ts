import axios from 'axios';
import { Avenger} from '../types/avenger';

const API_URL = 'http://localhost:3000/api/avengers';

export const getAvengers = async (): Promise<Avenger[]> => {
  try {
    const response = await axios.get<Avenger[]>(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching avengers:', error);
    throw error;
  }
};

export const createAvenger = async (avenger: {
  nombre: string;
  alias: string;
  actor: string;
  descripcion: string;
  habilidades: string; // en formulario viene como string separado por comas o similar
}): Promise<Avenger> => {
  try {
    // Convertimos el string de habilidades (por ejemplo "genio,millonario") a array de strings
    const habilidadesArray: string[] = avenger.habilidades
      .split(',')
      .map(h => h.trim())
      .filter(h => h.length > 0);

    const payload = {
      nombre: avenger.nombre,
      alias: avenger.alias,
      actor: avenger.actor,
      descripcion: avenger.descripcion,
      habilidades: habilidadesArray,
    };

    const response = await axios.post<Avenger>(API_URL, payload);
    return response.data;
  } catch (error) {
    console.error('Error creating avenger:', error);
    throw error;
  }
};
