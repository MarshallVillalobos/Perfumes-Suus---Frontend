import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Inicio() {
  return (
    <>
      <Header />

      <main>
        <section id="historia" className="tarjeta-seccion contenedor-filas">
          <div className="col-6">
            <h2 className="titulo-seccion">Nuestra historia</h2>
            <p>
              Perfumes Suus fue fundada en el año <strong>2024</strong> por Hector y
              Susana, un químico farmacéutico junto a su esposa emprendedora. Comenzó
              con un simple hobbie de Don Hector, escalando ahora con más de 1000
              clientes.
            </p>
          </div>
          <div className="col-6">
            <img
              src="/img/perfume_principal.webp"
              alt="Botellas de perfumes"
              className="imagen-destacada"
            />
          </div>
        </section>

        <section id="sucursales" className="tarjeta-seccion contenedor-filas">
          <div className="col-6">
            <h2 className="titulo-seccion">Nuestras sucursales</h2>
            <p>Hasta el momento contamos con dos sucursales en:</p>
            <ul>
              <li>Sucursal Providencia</li>
              <li>Sucursal Las Condes</li>
            </ul>
          </div>
          <div className="col-6">
            <img
              src="/img/tienda.jpg"
              alt="Fachada tiendas"
              className="imagen-destacada"
            />
          </div>
        </section>

        <section id="productos" className="tarjeta-seccion">
          <h2 className="titulo-seccion">Nuestros productos</h2>
          <p className="texto-seccion">
            Descubre nuestra exclusiva variedad de perfumes árabes, de nicho y de
            autoría.
          </p>
          <Link to="/productos" className="boton-principal">
            Ver Catálogo Completo
          </Link>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default Inicio;