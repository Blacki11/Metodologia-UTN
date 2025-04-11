import styles from './EstudianteCard.module.css';

interface EstudianteCardProps {
  id: number;
  nombre: string;
  edad: number;
}

const EstudianteCard = ({ id, nombre, edad }: EstudianteCardProps) => {
  return (
    <div className={styles.estudianteCard}>
      <div className={styles.estudianteCardContent}>
        <h3 className={styles.estudianteCardName}>{nombre}</h3>
        <div className={styles.estudianteCardInfo}>
          <span>ID: {id}</span>
          <span>Edad: {edad} años</span>
        </div>
      </div>
    </div>
  );
};

export default EstudianteCard;