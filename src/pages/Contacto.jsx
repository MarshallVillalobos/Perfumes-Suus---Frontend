import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { validarCorreo } from '../utils/validaciones';

function Contacto() {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [comentario, setComentario] = useState('');

  const [errores, setErrores] = useState({
    nombre: '',
    correo: '',
    comentario: '',
  });

  const manejarSubmit = (e) => {
    e.preventDefault();

    const nombreTrim = nombre.trim();
    const correoTrim = correo.trim().toLowerCase();
    const comentarioTrim = comentario.trim();

    const nuevosErrores = { nombre: '', correo: '', comentario: '' };
    let hayErrores = false;

    if (nombreTrim === '') {
      nuevosErrores.nombre = 'El nombre completo es obligatorio.';
      hayErrores = true;
    } else if (nombreTrim.length > 100) {
      nuevosErrores.nombre =
        'El nombre completo no puede superar los 100 caracteres.';
      hayErrores = true;
    }

    if (correoTrim === '') {
      nuevosErrores.correo = 'El correo es obligatorio.';
      hayErrores = true;
    } else if (correoTrim.length > 100) {
      nuevosErrores.correo = 'El correo no puede superar los 100 caracteres.';
      hayErrores = true;
    } else if (!validarCorreo(correoTrim)) {
      nuevosErrores.correo =
        'Formato inválido. Use @duoc.cl, @profesor.duoc.cl o @gmail.com.';
      hayErrores = true;
    }

    if (comentarioTrim === '') {
      nuevosErrores.comentario = 'El comentario es obligatorio.';
      hayErrores = true;
    } else if (comentarioTrim.length > 500) {
      nuevosErrores.comentario =
        'El comentario no puede superar los 500 caracteres.';
      hayErrores = true;
    }

    setErrores(nuevosErrores);

    if (!hayErrores) {
      alert('¡Mensaje de contacto enviado con éxito!');
      setNombre('');
      setCorreo('');
      setComentario('');
    }
  };

  return (
    <>
      <Header />

      <main className="tarjeta-seccion contenedor-login">
        <div className="encabezado-contacto">
          <h2 className="titulo-seccion titulo-sin-borde">Perfumes Suus</h2>
        </div>

        <div className="banner-contacto">FORMULARIO DE CONTACTOS</div>

        <form
          id="formulario-contacto"
          className="formulario-auth"
          onSubmit={manejarSubmit}
          noValidate
        >
          <div className="grupo-form">
            <label htmlFor="nombre-contacto">NOMBRE COMPLETO</label>
            <input
              type="text"
              id="nombre-contacto"
              maxLength="100"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
            <span id="error-nombre-contacto" className="mensaje-error">
              {errores.nombre}
            </span>
          </div>

          <div className="grupo-form">
            <label htmlFor="correo-contacto">CORREO</label>
            <input
              type="email"
              id="correo-contacto"
              maxLength="100"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
            />
            <span id="error-correo-contacto" className="mensaje-error">
              {errores.correo}
            </span>
          </div>

          <div className="grupo-form">
            <label htmlFor="comentario-contacto">CONTENIDO</label>
            <textarea
              id="comentario-contacto"
              rows="5"
              maxLength="500"
              value={comentario}
              onChange={(e) => setComentario(e.target.value)}
            ></textarea>
            <span id="error-comentario-contacto" className="mensaje-error">
              {errores.comentario}
            </span>
          </div>

          <div className="acciones-contacto">
            <button type="submit" className="boton-principal btn-mitad">
              ENVIAR MENSAJE
            </button>
          </div>
        </form>
      </main>

      <Footer />
    </>
  );
}

export default Contacto;