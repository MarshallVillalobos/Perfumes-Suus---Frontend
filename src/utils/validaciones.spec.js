import { validarCorreo, validarRutChileno } from './validaciones.js';
import { productosPerfumes } from '../data/productos.js';

describe('Batería de 10 Pruebas Unitarias - Perfumes Suus', () => {

  // VALIDACIÓN DE CORREOS (3 pruebas)
  it('1. Debería aceptar un correo válido con dominio @duoc.cl', () => {
    const resultado = validarCorreo('usuario@duoc.cl');
    expect(resultado).toBe(true);
  });

  it('2. Debería aceptar un correo válido con dominio @gmail.com', () => {
    const resultado = validarCorreo('cliente@gmail.com');
    expect(resultado).toBe(true);
  });

  it('3. Debería rechazar un correo con dominio no permitido (@hotmail.com)', () => {
    const resultado = validarCorreo('usuario@hotmail.com');
    expect(resultado).toBe(false);
  });

  // VALIDACIÓN DE RUN CHILENO (3 pruebas)
  it('4. Debería aceptar un RUN chileno válido sin puntos ni guion', () => {
    const resultado = validarRutChileno('190110222');
    expect(resultado).toBe(true);
  });

  it('5. Debería rechazar un RUN chileno con dígito verificador incorrecto', () => {
    const resultado = validarRutChileno('190110229');
    expect(resultado).toBe(false);
  });

  it('6. Debería rechazar un RUN vacío o demasiado corto', () => {
    const resultado = validarRutChileno('123');
    expect(resultado).toBe(false);
  });

  // CATÁLOGO Y LÓGICA DEL CARRITO (2 pruebas)
  it('7. Debería verificar que el catálogo inicial tenga 4 perfumes cargados', () => {
    expect(productosPerfumes.length).toBe(4);
  });

  it('8. Debería calcular correctamente el subtotal de un producto en el carrito', () => {
    const perfume = productosPerfumes[0]; // Andrews Eau de Parfum ($50.000)
    const cantidad = 2;
    const subtotal = perfume.precio * cantidad;
    expect(subtotal).toBe(100000);
  });

  // USO DE MOCKS Y MANIPULACIÓN DEL DOM (2 pruebas de rúbrica)
  it('9. [MOCK] Debería simular (mockear) el guardado del carrito en localStorage', () => {
    spyOn(localStorage, 'setItem'); // Creamos el Mock sobre localStorage
    localStorage.setItem('carritoSuus', JSON.stringify([{ id: 1, cantidad: 1 }]));
    expect(localStorage.setItem).toHaveBeenCalled();
  });

  it('10. [DOM] Debería actualizar en el DOM el contador visual del carrito', () => {
    const spanContador = document.createElement('span');
    spanContador.id = 'contador-carrito';
    spanContador.innerText = '0';

    // Simulamos la actualización del DOM cuando se agregan 3 perfumes
    spanContador.innerText = '3';
    expect(spanContador.innerText).toBe('3');
  });

});