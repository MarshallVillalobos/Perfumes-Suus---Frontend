import { useState } from 'react';
import { Link } from 'react-router-dom';
import SidebarAdmin from '../../components/SidebarAdmin';
import { usuariosIniciales } from '../../data/productos';

function AdminUsuarios() {
  const [usuarios, setUsuarios] = useState(usuariosIniciales);
  const [filtroRol, setFiltroRol] = useState('Todos los usuarios');

  const eliminarUsuario = (run) => {
    if (window.confirm('¿Deseas eliminar este usuario?')) {
      setUsuarios((prev) => prev.filter((u) => u.run !== run));
    }
  };

  const usuariosFiltrados = usuarios.filter((u) => {
    if (filtroRol === 'Administradores') return u.rol === 'Admin';
    if (filtroRol === 'Clientes') return u.rol === 'Cliente';
    return true;
  });

  return (
    <div className="body-admin">
      <div className="contenedor-admin">
        <SidebarAdmin />

        <main className="contenido-admin">
          <header className="header-mantenedor">
            <h1>Usuarios</h1>
            <Link to="/admin/nuevo-usuario" className="boton-oscuro">
              NUEVO USUARIO
            </Link>
          </header>

          <section className="panel-contenido">
            <div className="filtro-tabla">
              <label htmlFor="filtro-rol">Filtrar por: </label>
              <select
                id="filtro-rol"
                value={filtroRol}
                onChange={(e) => setFiltroRol(e.target.value)}
              >
                <option value="Todos los usuarios">Todos los usuarios</option>
                <option value="Administradores">Administradores</option>
                <option value="Clientes">Clientes</option>
              </select>
            </div>

            <div className="contenedor-tabla">
              <table className="tabla-admin">
                <thead>
                  <tr>
                    <th>RUN</th>
                    <th>Nombre Completo</th>
                    <th>Correo</th>
                    <th>Rol</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {usuariosFiltrados.map((user) => (
                    <tr key={user.run}>
                      <td>{user.run}</td>
                      <td>{user.nombre}</td>
                      <td>{user.correo}</td>
                      <td>
                        <span
                          className={`etiqueta ${
                            user.rol === 'Admin' ? 'rol-admin' : 'rol-cliente'
                          }`}
                        >
                          {user.rol}
                        </span>
                      </td>
                      <td>
                        <button className="btn-icono editar">✏️</button>
                        <button
                          className="btn-icono eliminar"
                          onClick={() => eliminarUsuario(user.run)}
                        >
                          🗑️
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="paginacion">
              <button>«</button>
              <button>‹</button>
              <button className="activo">1</button>
              <button>2</button>
              <button>3</button>
              <button>›</button>
              <button>»</button>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default AdminUsuarios;