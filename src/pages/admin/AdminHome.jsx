import SidebarAdmin from '../../components/SidebarAdmin';
import { productosPerfumes, usuariosIniciales } from '../../data/productos';

function AdminHome() {
  return (
    <div className="body-admin">
      <div className="contenedor-admin">
        <SidebarAdmin />

        <main className="contenido-admin">
          <header className="header-admin">
            <h1>¡HOLA Administrador!</h1>
            <div className="notificaciones">🔔</div>
          </header>

          <section className="panel-bienvenida">
            <h2>Bienvenido al Sistema de Gestión</h2>
            <p>
              Desde aquí podrás controlar el inventario de perfumes y administrar
              los accesos de tus usuarios.
            </p>

            <div className="tarjetas-resumen">
              <div className="tarjeta-dato">
                <h3>Total Productos</h3>
                <p className="numero-grande">{productosPerfumes.length}</p>
              </div>
              <div className="tarjeta-dato">
                <h3>Usuarios Activos</h3>
                <p className="numero-grande">{usuariosIniciales.length}</p>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default AdminHome;