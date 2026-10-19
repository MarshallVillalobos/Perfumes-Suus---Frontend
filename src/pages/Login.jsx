import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { validarCorreo } from '../utils/validaciones';

function Login() {
  const navigate = useNavigate();
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [errores, setErrores] = useState({ correo: '', contrasena: '' });

  const manejarSubmit = (e) => {
    e.preventDefault();

    const inputCorreo = correo.trim().toLowerCase();
    const inputContrasena = contrasena.trim();

    const nuevosErrores = { correo: '', contrasena: '' };
    let hayErrores = false;

    if (inputCorreo === '') {
      nuevosErrores.correo = 'El correo es obligatorio.';
      hayErrores = true;
    } else if (inputCorreo.length > 100) {
      nuevosErrores.correo = 'El correo no puede superar los 100 caracteres.';
      hayErrores = true;
    } else if (!validarCorreo(inputCorreo)) {
      nuevosErrores.correo =
        'Formato inválido. Dominios permitidos: @duoc.cl, @profesor.duoc.cl, @gmail.com.';
      hayErrores = true;
    }

    if (inputContrasena === '') {
      nuevosErrores.contrasena = 'La contraseña es obligatoria.';
      hayErrores = true;
    } else if (inputContrasena.length < 4 || inputContrasena.length > 10) {
      nuevosErrores.contrasena =
        'La contraseña debe tener entre 4 y 10 caracteres.';
      hayErrores = true;
    }

    setErrores(nuevosErrores);

    if (!hayErrores) {
      if (inputCorreo === 'admin@duoc.cl') {
        alert('¡Bienvenido al panel de control, Administrador!');
        navigate('/admin');
      } else {
        alert('¡Inicio de sesión exitoso!');
        navigate('/');
      }
    }
  };

  return (
    <>
      <Header />

      <main className="tarjeta-seccion contenedor-login">
        <h2 className="titulo-seccion">Iniciar Sesión</h2>

        <form
          id="formulario-login"
          className="formulario-auth"
          onSubmit={manejarSubmit}
          noValidate
        >
          <div className="grupo-form">
            <label htmlFor="correo">Correo</label>
            <input
              type="email"
              id="correo"
              placeholder="ejemplo@duoc.cl"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
            />
            <span id="error-correo" className="mensaje-error">
              {errores.correo}
            </span>
          </div>

          <div className="grupo-form">
            <label htmlFor="contrasena">Contraseña</label>
            <input
              type="password"
              id="contrasena"
              placeholder="Mínimo 4 caracteres"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
            />
            <span id="error-contrasena" className="mensaje-error">
              {errores.contrasena}
            </span>
          </div>

          <button type="submit" className="boton-principal btn-block">
            Ingresar
          </button>
        </form>
      </main>

      <Footer />
    </>
  );
}

export default Login;