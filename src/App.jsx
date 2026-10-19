import { Routes, Route } from 'react-router-dom';
import { CarritoProvider } from './context/CarritoContext';

import Inicio from './pages/Inicio';
import Productos from './pages/Productos';
import DetalleProducto from './pages/DetalleProducto';
import Carrito from './pages/Carrito';
import Contacto from './pages/Contacto';
import Login from './pages/Login';
import Registro from './pages/Registro';

import AdminHome from './pages/admin/AdminHome';
import AdminProductos from './pages/admin/AdminProductos';
import AdminNuevoProducto from './pages/admin/AdminNuevoProducto';
import AdminUsuarios from './pages/admin/AdminUsuarios';
import AdminNuevoUsuario from './pages/admin/AdminNuevoUsuario';

function App() {
  return (
    <CarritoProvider>
      <Routes>
        {/* Rutas Públicas de la Tienda */}
        <Route path="/" element={<Inicio />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/producto/:id" element={<DetalleProducto />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />

        {/* Rutas del Administrador */}
        <Route path="/admin" element={<AdminHome />} />
        <Route path="/admin/productos" element={<AdminProductos />} />
        <Route path="/admin/nuevo-producto" element={<AdminNuevoProducto />} />
        <Route path="/admin/usuarios" element={<AdminUsuarios />} />
        <Route path="/admin/nuevo-usuario" element={<AdminNuevoUsuario />} />
      </Routes>
    </CarritoProvider>
  );
}

export default App;