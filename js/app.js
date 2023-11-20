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
    console.log(e.target.value);
  }


  
});
