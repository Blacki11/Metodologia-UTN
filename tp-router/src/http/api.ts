
const API_URL = 'http://localhost:3001';

export interface Estudiante {
  id: number;
  nombre: string;
  edad: number;
}

export interface Curso {
  id: number;
  nombre: string;
  estudiantes: Estudiante[];
}

export const fetchCursos = async (): Promise<Curso[]> => {
  try {
    const response = await fetch(`${API_URL}/cursos`);
    
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }
    
    const data: Curso[] = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching cursos:', error);
    throw error;
  }
};

export const fetchCursoById = async (id: number): Promise<Curso> => {
  try {
    const response = await fetch(`${API_URL}/cursos/${id}`);
    
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }
    
    const data: Curso = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching curso con id ${id}:`, error);
    throw error;
  }
};