// validamos que se descargo todo el codigo html
document.addEventListener('DOMContentLoaded', () => {
  // Seleccionar los elementos de la interfaz
  const inputEmail = document.querySelector('#email');
  const inputAsunto = document.querySelector('#asunto');
  const inputMensaje = document.querySelector('#mensaje');

  // Asignar eventos

  // evento al abandonar campo
  inputEmail.addEventListener('blur', validar);
  inputAsunto.addEventListener('blur', validar);
  inputMensaje.addEventListener('blur', validar);

  // función validar
  function validar(e) {
    e.target.value.trim() === ''
      ? mostrarAlerta()
      : console.log(e.target.value);
  }

  function mostrarAlerta() {
    // Generar alerta en HTML
    const error = document.createElement('P');
    error.textContent = 'Hubo un Error';

    console.log(error);
  }
});
