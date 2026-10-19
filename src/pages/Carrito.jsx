import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useCarrito } from '../context/CarritoContext';

function Carrito() {
  const { carrito, eliminarDelCarrito, totalPrecio } = useCarrito();
  const [cupon, setCupon] = useState('');

  return (
    <>
      <Header />

      <main className="tarjeta-seccion">
        <div className="contenedor-filas">
          <div className="col-8" id="lista-carrito">
            {carrito.length === 0 ? (
              <p style={{ textAlign: 'center', padding: '40px' }}>
                Tu carrito está vacío.
              </p>
            ) : (
              carrito.map((producto, index) => {
                const subtotal = producto.precio * producto.cantidad;
                return (
                  <div key={producto.id} className="item-carrito">
                    <img src={producto.imagen} alt={producto.nombre} />
                    <div className="item-carrito-info">
                      <h4>{producto.nombre}</h4>
                      <p>
                        ${producto.precio.toLocaleString('es-CL')} x{' '}
                        {producto.cantidad}
                      </p>
                    </div>
                    <div className="item-carrito-acciones">
                      <strong style={{ display: 'block', fontSize: '18px' }}>
                        ${subtotal.toLocaleString('es-CL')}
                      </strong>
                      <button
                        className="btn-eliminar"
                        onClick={() => eliminarDelCarrito(index)}
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          <div className="col-4 resumen-carrito">
            <h3>
              TOTAL:{' '}
              <span id="total-carrito">
                ${totalPrecio.toLocaleString('es-CL')}
              </span>
            </h3>

            <label htmlFor="cupon">Ingrese cupón de descuento:</label>
            <div className="contenedor-cupon">
              <input
                type="text"
                id="cupon"
                value={cupon}
                onChange={(e) => setCupon(e.target.value)}
              />
              <button type="button" className="btn-aplicar">
                Aplicar
              </button>
            </div>

            <button type="button" className="boton-principal btn-pagar">
              PAGAR
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default Carrito;