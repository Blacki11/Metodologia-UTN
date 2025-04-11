import { Link } from 'react-router-dom';
import styles from './CursoCard.module.css';

interface CursoCardProps {
  id: number;
  nombre: string;
  cantidadEstudiantes: number;
}

const CursoCard = ({ id, nombre, cantidadEstudiantes }: CursoCardProps) => {
  return (
    <div className={styles.cursoCard}>
      <div className={styles.cursoCardContent}>
        <h2 className={styles.cursoCardTitle}>{nombre}</h2>
        <p className={styles.cursoCardStudents}>
          {cantidadEstudiantes} estudiantes inscriptos
        </p>
        <Link
          to={`/estudiantes?curso=${id}`}
          className={styles.cursoCardLink}
        >
          Ver estudiantes
        </Link>
      </div>
    </div>
  );
};

export default CursoCard;