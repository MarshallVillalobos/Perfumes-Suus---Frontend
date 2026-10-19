import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { productosPerfumes } from '../data/productos';
import { useCarrito } from '../context/CarritoContext';

function DetalleProducto() {
  const { id } = useParams();
  const { agregarAlCarrito } = useCarrito();
  const [cantidad, setCantidad] = useState(1);

  const producto = productosPerfumes.find((p) => p.id === parseInt(id));

  if (!producto) {
    return (
      <>
        <Header />
        <main className="tarjeta-seccion" id="detalle-producto">
          <p>
            Producto no encontrado.{' '}
            <Link to="/productos">Volver al catálogo</Link>
          </p>
        </main>
        <Footer />
      </>
    );
  }

  const manejarAgregar = () => {
    const cantValida = parseInt(cantidad) || 1;
    agregarAlCarrito(producto.id, cantValida);
  };

  return (
    <>
      <Header />

      <main className="tarjeta-seccion" id="detalle-producto">
        <div className="contenedor-filas">
          <div className="col-6">
            <img
              id="detalle-imagen"
              src={producto.imagen}
              alt={producto.nombre}
              className="img-detalle"
            />
            <div className="contenedor-miniaturas">
              <div className="miniatura activa"></div>
              <div className="miniatura"></div>
              <div className="miniatura"></div>
            </div>
          </div>

          <div className="col-6 info-producto">
            <div className="encabezado-detalle">
              <h2 id="detalle-nombre">{producto.nombre}</h2>
              <h2 id="detalle-precio">
                ${producto.precio.toLocaleString('es-CL')}
              </h2>
            </div>

            <p id="detalle-descripcion" className="descripcion-detalle">
              {producto.descripcion}
            </p>

            <div className="contenedor-cantidad">
              <label htmlFor="cantidad">Cantidad</label>
              <input
                type="number"
                id="cantidad"
                min="1"
                value={cantidad}
                onChange={(e) => setCantidad(e.target.value)}
                className="input-cantidad"
              />
            </div>

            <button
              id="btn-detalle-agregar"
              className="boton-principal btn-block"
              onClick={manejarAgregar}
            >
              Añadir al carrito
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default DetalleProducto;