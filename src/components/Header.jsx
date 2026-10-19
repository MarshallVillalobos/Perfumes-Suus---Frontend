import { Link } from 'react-router-dom';
import { useCarrito } from '../context/CarritoContext';

function Header() {
  const { cantidadTotal } = useCarrito();

  return (
    <header className="encabezado-principal contenedor-filas">
      <div className="col-3">
        <Link to="/">
          <img
            src="/img/Logo_pagina_web.png"
            alt="Logo pagina web"
            className="logo-img"
          />
        </Link>
      </div>

      <div className="col-6 contenedor-centrado">
        <h1 className="titulo-sitio">Perfumes Suus</h1>
        <nav className="menu-principal">
          <ul>
            <li>
              <Link to="/">Inicio</Link>
            </li>
            <li>
              <Link to="/productos">Productos</Link>
            </li>
            <li>
              <Link to="/contacto">Contacto</Link>
            </li>
            <li>
              <Link to="/carrito">
                Mi Carrito <span id="contador-carrito">{cantidadTotal}</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      <div className="col-3 alineacion-derecha">
        <nav className="menu-secundario">
          <Link to="/login">Iniciar Sesión</Link>
          <span className="separador-menu">|</span>
          <Link to="/registro">Registrar usuario</Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;