import AppRouter from './routes/AppRouter';
import './App.css';

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <div className="container">
          <h1>Gestión de Cursos</h1>
        </div>
      </header>
      
      <main className="app-main">
        <AppRouter />
      </main>
      
      <footer className="app-footer">
        <div className="container">
          <p>Trabajo Práctico: Consumo de JSON Server y React Router</p>
        </div>
      </footer>
    </div>
  );
}

export default App;