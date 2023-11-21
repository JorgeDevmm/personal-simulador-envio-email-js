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
    const referencia = e.target.parentElement;

    console.log(e.target.id);

    if (e.target.value.trim() === '') {
      mostrarAlerta(`El Campo ${e.target.id}  es obligatorio`, referencia);
      return;
    }

    if (!validarEmail(e.target.value) && e.target.id === 'email') {
      mostrarAlerta(`El Campo ${e.target.id} no es válido`, referencia);
      return;
    }

    limpiarAlerta(referencia);
  }

  function mostrarAlerta(mensaje, referencia) {
    // Comprueba si ya existe una alerta, en la referencia
    limpiarAlerta(referencia);

    // Generar alerta en HTML
    const error = document.createElement('P');
    error.textContent = mensaje;
    error.classList.add('text-white', 'text-center', 'bg-red-600', 'p-2');

    // Inyectar el error al formulario
    referencia.appendChild(error);
  }

  // Limpiar alerta
  function limpiarAlerta(referencia) {
    // Comprueba si ya existe una alerta, en la referencia
    const alerta = referencia.querySelector('.bg-red-600');
    if (alerta) {
      alerta.remove();
    }
  }

  function validarEmail(email) {
    const regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    // validar email con expresión regular
    const resultado = regex.test(email);
    return resultado;
  }
});
