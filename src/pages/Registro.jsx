import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { datosUbicacion } from '../data/ubicaciones';
import { validarCorreo, validarRutChileno } from '../utils/validaciones';

function Registro() {
  const navigate = useNavigate();

  const [run, setRun] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [correo, setCorreo] = useState('');
  const [fechaNac, setFechaNac] = useState('');
  const [region, setRegion] = useState('');
  const [comuna, setComuna] = useState('');
  const [direccion, setDireccion] = useState('');

  const [errores, setErrores] = useState({});

  const manejarCambioRegion = (e) => {
    setRegion(e.target.value);
    setComuna('');
  };

  const manejarSubmit = (e) => {
    e.preventDefault();

    const inputRun = run.trim();
    const inputNombre = nombre.trim();
    const inputApellidos = apellidos.trim();
    const inputCorreo = correo.trim().toLowerCase();
    const inputDireccion = direccion.trim();

    const nuevosErrores = {};
    let hayErrores = false;

    if (region === '') {
      nuevosErrores.region = 'Debe seleccionar una región.';
      hayErrores = true;
    }

    if (comuna === '') {
      nuevosErrores.comuna = 'Debe seleccionar una comuna.';
      hayErrores = true;
    }

    if (inputDireccion === '') {
      nuevosErrores.direccion = 'La dirección es obligatoria.';
      hayErrores = true;
    } else if (inputDireccion.length > 300) {
      nuevosErrores.direccion =
        'La dirección no puede superar los 300 caracteres.';
      hayErrores = true;
    }

    if (inputRun === '') {
      nuevosErrores.run = 'El RUN es obligatorio.';
      hayErrores = true;
    } else if (inputRun.includes('.') || inputRun.includes('-')) {
      nuevosErrores.run = 'El RUN debe ser ingresado sin puntos ni guion.';
      hayErrores = true;
    } else if (inputRun.length < 7 || inputRun.length > 9) {
      nuevosErrores.run = 'El RUN debe tener entre 7 y 9 caracteres.';
      hayErrores = true;
    } else if (!validarRutChileno(inputRun)) {
      nuevosErrores.run = 'El RUN ingresado no es válido matemáticamente.';
      hayErrores = true;
    }

    if (inputNombre === '') {
      nuevosErrores.nombre = 'El nombre es obligatorio.';
      hayErrores = true;
    } else if (inputNombre.length > 50) {
      nuevosErrores.nombre = 'El nombre no puede superar los 50 caracteres.';
      hayErrores = true;
    }

    if (inputApellidos === '') {
      nuevosErrores.apellidos = 'Los apellidos son obligatorios.';
      hayErrores = true;
    } else if (inputApellidos.length > 100) {
      nuevosErrores.apellidos =
        'Los apellidos no pueden superar los 100 caracteres.';
      hayErrores = true;
    }

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

    setErrores(nuevosErrores);

    if (!hayErrores) {
      alert('¡Registro completado con éxito!');
      navigate('/login');
    }
  };

  const comunasDisponibles = region ? datosUbicacion[region] || [] : [];

  return (
    <>
      <Header />

      <main className="tarjeta-seccion contenedor-login">
        <h2 className="titulo-seccion">Registro de Usuario</h2>

        <form
          id="formulario-registro"
          className="formulario-auth"
          onSubmit={manejarSubmit}
          noValidate
        >
          <div className="grupo-form">
            <label htmlFor="run">RUN (Sin puntos ni guion)</label>
            <input
              type="text"
              id="run"
              placeholder="Ej: 190110222"
              maxLength="9"
              value={run}
              onChange={(e) => setRun(e.target.value)}
            />
            <span id="error-run" className="mensaje-error">
              {errores.run}
            </span>
          </div>

          <div className="grupo-form">
            <label htmlFor="nombre">Nombre</label>
            <input
              type="text"
              id="nombre"
              placeholder="Tu nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
            <span id="error-nombre" className="mensaje-error">
              {errores.nombre}
            </span>
          </div>

          <div className="grupo-form">
            <label htmlFor="apellidos">Apellidos</label>
            <input
              type="text"
              id="apellidos"
              placeholder="Tus apellidos"
              value={apellidos}
              onChange={(e) => setApellidos(e.target.value)}
            />
            <span id="error-apellidos" className="mensaje-error">
              {errores.apellidos}
            </span>
          </div>

          <div className="grupo-form">
            <label htmlFor="correo-reg">Correo Electrónico</label>
            <input
              type="email"
              id="correo-reg"
              placeholder="ejemplo@duoc.cl"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
            />
            <span id="error-correo-reg" className="mensaje-error">
              {errores.correo}
            </span>
          </div>

          <div className="grupo-form">
            <label htmlFor="fecha-nac">Fecha de Nacimiento (Opcional)</label>
            <input
              type="date"
              id="fecha-nac"
              value={fechaNac}
              onChange={(e) => setFechaNac(e.target.value)}
            />
          </div>

          <div className="grupo-form">
            <label htmlFor="region">Región</label>
            <select id="region" value={region} onChange={manejarCambioRegion}>
              <option value="">-- Seleccione una región --</option>
              {Object.keys(datosUbicacion).map((reg) => (
                <option key={reg} value={reg}>
                  {reg}
                </option>
              ))}
            </select>
            <span id="error-region" className="mensaje-error">
              {errores.region}
            </span>
          </div>

          <div className="grupo-form">
            <label htmlFor="comuna">Comuna</label>
            <select
              id="comuna"
              value={comuna}
              onChange={(e) => setComuna(e.target.value)}
              disabled={!region}
            >
              <option value="">-- Seleccione una comuna --</option>
              {comunasDisponibles.map((com) => (
                <option key={com} value={com}>
                  {com}
                </option>
              ))}
            </select>
            <span id="error-comuna" className="mensaje-error">
              {errores.comuna}
            </span>
          </div>

          <div className="grupo-form">
            <label htmlFor="direccion">Dirección</label>
            <input
              type="text"
              id="direccion"
              placeholder="Tu dirección completa"
              maxLength="300"
              value={direccion}
              onChange={(e) => setDireccion(e.target.value)}
            />
            <span id="error-direccion" className="mensaje-error">
              {errores.direccion}
            </span>
          </div>

          <button type="submit" className="boton-principal btn-block">
            Registrarse
          </button>
        </form>
      </main>

      <Footer />
    </>
  );
}

export default Registro;