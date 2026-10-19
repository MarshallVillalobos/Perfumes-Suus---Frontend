import Header from '../components/Header';
import Footer from '../components/Footer';
import TarjetaProducto from '../components/TarjetaProducto';
import { productosPerfumes } from '../data/productos';
import { useCarrito } from '../context/CarritoContext';

function Productos() {
  const { agregarAlCarrito } = useCarrito();

  return (
    <>
      <Header />

      <main className="tarjeta-seccion container">
        <h2 className="titulo-seccion">Nuestras Fragancias</h2>

        {/* Usamos el sistema de grillas responsivo y pasamos props al componente hijo */}
        <div className="grilla-productos row g-4">
          {productosPerfumes.map((item) => (
            <div key={item.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
              <TarjetaProducto
                producto={item}
                alAgregar={agregarAlCarrito}
              />
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </>
  );
}

export default Productos;