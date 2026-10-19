import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="pie-pagina-avanzado">
      <div className="contenedor-footer">
        <div className="col-footer">
          <h3>Centro de Ayuda</h3>
          <ul>
            <li>
              <a href="#seguimiento">Seguimiento de mis compras</a>
            </li>
            <li>
              <a href="#cambios">Cambios y devoluciones</a>
            </li>
            <li>
              <a href="#garantia">Garantía de producto</a>
            </li>
            <li>
              <Link to="/contacto">Contáctanos</Link>
            </li>
          </ul>
        </div>

        <div className="col-footer">
          <h3>Mundo Suus</h3>
          <ul>
            <li>
              <a href="/#historia">Nuestra Historia</a>
            </li>
            <li>
              <a href="/#sucursales">Nuestras Sucursales</a>
            </li>
            <li>
              <a href="#sostenibilidad">Sostenibilidad</a>
            </li>
            <li>
              <a href="#cyber">Cyber Suus</a>
            </li>
          </ul>
        </div>

        <div className="col-footer">
          <h3>Síguenos</h3>
          <div className="iconos-footer">
            <span>📷 Instagram</span>
            <span>🎵 TikTok</span>
            <span>📘 Facebook</span>
          </div>

          <h3 className="titulo-espaciado">Medios de pago</h3>
          <div className="iconos-footer">
            <span>💳 Webpay</span>
            <span>🏦 Transferencia</span>
          </div>
        </div>
      </div>

      <div className="legal-footer">
        <p>
          Copyright © 2024 Perfumes Suus |{' '}
          <a href="#terminos">Términos y Condiciones</a> |{' '}
          <a href="#privacidad">Políticas de Privacidad</a> |{' '}
          <a href="#bases">Bases legales</a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;