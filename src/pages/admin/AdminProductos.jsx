import { useState } from 'react';
import { Link } from 'react-router-dom';
import SidebarAdmin from '../../components/SidebarAdmin';
import { productosPerfumes } from '../../data/productos';

function AdminProductos() {
  const [listaProductos, setListaProductos] = useState(productosPerfumes);
  const [categoriaFiltro, setCategoriaFiltro] = useState('Todas las categorías');

  const eliminarProducto = (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      setListaProductos((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const productosFiltrados =
    categoriaFiltro === 'Todas las categorías'
      ? listaProductos
      : listaProductos.filter((p) => p.categoria === categoriaFiltro);

  return (
    <div className="body-admin">
      <div className="contenedor-admin">
        <SidebarAdmin />

        <main className="contenido-admin">
          <header className="header-mantenedor">
            <h1>Productos</h1>
            <Link to="/admin/nuevo-producto" className="boton-oscuro">
              NUEVO PRODUCTO
            </Link>
          </header>

          <section className="panel-contenido">
            <div className="filtro-tabla">
              <label htmlFor="filtro-categoria">Filtrar por: </label>
              <select
                id="filtro-categoria"
                value={categoriaFiltro}
                onChange={(e) => setCategoriaFiltro(e.target.value)}
              >
                <option value="Todas las categorías">Todas las categorías</option>
                <option value="Perfumes Árabes">Perfumes Árabes</option>
                <option value="Perfumes de Nicho">Perfumes de Nicho</option>
                <option value="Perfumes de Autor">Perfumes de Autor</option>
              </select>
            </div>

            <div className="contenedor-tabla">
              <table className="tabla-admin">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Imagen</th>
                    <th>Nombre del Producto</th>
                    <th>Precio</th>
                    <th>Stock</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {productosFiltrados.map((prod) => (
                    <tr key={prod.id}>
                      <td>{prod.codigo}</td>
                      <td>
                        <img
                          src={prod.imagen}
                          alt={prod.nombre}
                          className="img-tabla-admin"
                        />
                      </td>
                      <td>{prod.nombre}</td>
                      <td>${prod.precio.toLocaleString('es-CL')}</td>
                      <td>
                        {prod.stock > 0 ? (
                          <span className="etiqueta rol-admin">
                            {prod.stock} und.
                          </span>
                        ) : (
                          <span className="etiqueta rol-cliente">Sin Stock</span>
                        )}
                      </td>
                      <td>
                        <button
                          className="btn-icono editar"
                          title="Editar Producto"
                        >
                          ✏️
                        </button>
                        <button
                          className="btn-icono eliminar"
                          title="Eliminar Producto"
                          onClick={() => eliminarProducto(prod.id)}
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
              <button>›</button>
              <button>»</button>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default AdminProductos;