
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import CursosScreen from '../components/screens/CursosScreen';
import EstudiantesScreen from '../components/screens/EstudiantesScreen';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/cursos" replace />} />
        
        <Route path="/cursos" element={<CursosScreen />} />
        <Route path="/estudiantes" element={<EstudiantesScreen />} />
        
        <Route path="*" element={<Navigate to="/cursos" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;