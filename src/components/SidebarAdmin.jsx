import { Link, useLocation, useNavigate } from 'react-router-dom';

function SidebarAdmin() {
  const location = useLocation();
  const navigate = useNavigate();

  const cerrarSesion = () => {
    alert('Has cerrado sesión exitosamente.');
    navigate('/login');
  };

  const esProductos = location.pathname.includes('/admin/productos') || location.pathname.includes('/admin/nuevo-producto');
  const esUsuarios = location.pathname.includes('/admin/usuarios') || location.pathname.includes('/admin/nuevo-usuario');
  const esDashboard = location.pathname === '/admin';

  return (
    <aside className="sidebar-admin">
      <div className="logo-admin">
        <img
          src="/img/Logo_pagina_web.png"
          alt="Logo Perfumes Suus"
          className="logo-admin-img"
        />
        <h3>Suus Admin</h3>
      </div>

      <nav className="menu-admin">
        <ul>
          <li className={esDashboard ? 'activo' : ''}>
            <Link to="/admin">Dashboard</Link>
          </li>
          <li className={esProductos ? 'activo' : ''}>
            <Link to="/admin/productos">Productos</Link>
          </li>
          <li className={esUsuarios ? 'activo' : ''}>
            <Link to="/admin/usuarios">Usuarios</Link>
          </li>
        </ul>
      </nav>

      <div className="perfil-admin">
        <p>
          <strong>Configuración</strong>
        </p>
        <p>Perfil</p>
        <button className="btn-salir" onClick={cerrarSesion}>
          Cerrar Sesión
        </button>
      </div>
    </aside>
  );
}

export default SidebarAdmin;