import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { fetchCursoById } from '../../http/api';
import EstudianteCard from '../ui/EstudianteCard';
import styles from './EstudiantesScreen.module.css';

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

const EstudiantesScreen = () => {
  const [searchParams] = useSearchParams();
  const cursoId = searchParams.get('curso');
  const navigate = useNavigate();
  
  const [curso, setCurso] = useState<Curso | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!cursoId) {
      navigate('/cursos');
      return;
    }

    const cargarCurso = async () => {
      try {
        setLoading(true);
        const data = await fetchCursoById(parseInt(cursoId));
        setCurso(data);
        setError(null);
      } catch (err) {
        setError('Error al cargar los estudiantes. Por favor, intenta nuevamente más tarde.');
        console.error('Error cargando curso:', err);
      } finally {
        setLoading(false);
      }
    };

    cargarCurso();
  }, [cursoId, navigate]);

  const volverACursos = () => {
    navigate('/cursos');
  };

  return (
    <div className="container">
      <button 
        onClick={volverACursos}
        className={styles.backButton}
      >
        ← Volver a cursos
      </button>
      
      {loading && (
        <div className="loading-message">
          <p>Cargando estudiantes...</p>
        </div>
      )}
      
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}
      
      {!loading && curso && (
        <>
          <h1 className={styles.cursoTitle}>
            {curso.nombre}
          </h1>
          <p className={styles.cursoEstudiantesCount}>
            {curso.estudiantes.length} estudiantes inscritos
          </p>
          
          <div className={styles.estudiantesGrid}>
            {curso.estudiantes.map(estudiante => (
              <EstudianteCard
                key={estudiante.id}
                id={estudiante.id}
                nombre={estudiante.nombre}
                edad={estudiante.edad}
              />
            ))}
          </div>
        </>
      )}
      
      {!loading && !error && !curso && (
        <div className={styles.notFoundMessage}>
          <p>No se encontró el curso solicitado.</p>
          <button 
            onClick={volverACursos}
            className={styles.actionButton}
          >
            Ver todos los cursos
          </button>
        </div>
      )}
    </div>
  );
};

export default EstudiantesScreen;