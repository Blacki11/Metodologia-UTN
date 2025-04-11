import { useEffect, useState } from 'react';
import { fetchCursos } from '../../http/api';
import CursoCard from '../ui/CursoCard';
import styles from './CursosScreen.module.css'

interface Estudiante {
  id: number;
  nombre: string;
  edad: number;
}

interface Curso {
  id: number;
  nombre: string;
  estudiantes: Estudiante[];
}

const CursosScreen = () => {
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const cargarCursos = async () => {
      try {
        setLoading(true);
        const data = await fetchCursos();
        setCursos(data);
        setError(null);
      } catch (err) {
        setError('Error al cargar los cursos. Por favor, intenta nuevamente más tarde.');
        console.error('Error cargando cursos:', err);
      } finally {
        setLoading(false);
      }
    };

    cargarCursos();
  }, []);

  return (
    <div className="container">
      <h1 className={styles.cursosTitle}>Cursos Disponibles</h1>
      
      {loading && (
        <div className={styles.loadingMessage}>
          <p>Cargando cursos...</p>
        </div>
      )}
      
      {error && (
        <div className={styles.errorMessage}>
          {error}
        </div>
      )}
      
      {!loading && !error && cursos.length === 0 && (
        <div className={styles.emptyMessage}>
          <p>No hay cursos disponibles en este momento.</p>
        </div>
      )}
      
      <div className={styles.cursosGrid}>
        {cursos.map(curso => (
          <CursoCard 
            key={curso.id} 
            id={curso.id} 
            nombre={curso.nombre} 
            cantidadEstudiantes={curso.estudiantes.length} 
          />
        ))}
      </div>
    </div>
  );
};

export default CursosScreen;