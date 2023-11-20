// validamos que se descargo todo el codigo html
document.addEventListener('DOMContentLoaded', () => {
  // Seleccionar los elementos de la interfaz
  const inputEmail = document.querySelector('#email');
  const inputAsunto = document.querySelector('#asunto');
  const inputMensaje = document.querySelector('#mensaje');

  const formulario = document.querySelector('#formulario');

  // Asignar eventos

  // evento al abandonar campo
  inputEmail.addEventListener('blur', validar);
  inputAsunto.addEventListener('blur', validar);
  inputMensaje.addEventListener('blur', validar);

  // función validar
  function validar(e) {

    e.target.value.trim() === ''
      ? mostrarAlerta(`El Campo ${e.target.id}  es obligatorio`)
      : console.log(e.target.value);
  }

  function mostrarAlerta(mensaje) {
    // Generar alerta en HTML
    const error = document.createElement('P');
    error.textContent = mensaje;
    error.classList.add('text-white', 'text-center', 'bg-red-600', 'p-2');

    // Inyectar el error al formulario
    formulario.appendChild(error);

    console.log(error);
  }
});
