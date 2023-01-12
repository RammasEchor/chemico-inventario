import { Route, Routes } from 'react-router-dom';
import './App.css';
import Inventario from './inventario/inventario';
import Login from './login/login';
import MainPage from './mainpage/mainpage';

function App() {
  return (
    <Routes>
      <Route path='/' element={<MainPage />} />
      <Route path='/login' element={<Login />} />
      <Route path='/inventario' element={<Inventario />} />
    </Routes>
  );
}

export default App;
