// validamos que se descargo todo el codigo html
document.addEventListener('DOMContentLoaded', () => {
  const email = {
    email: '',
    asunto: '',
    mensaje: '',
  };

  // Seleccionar los elementos de la interfaz
  const inputEmail = document.querySelector('#email');
  const inputCC = document.querySelector('#cc');
  const inputAsunto = document.querySelector('#asunto');
  const inputMensaje = document.querySelector('#mensaje');

  const formulario = document.querySelector('#formulario');
  const spinner = document.querySelector('#spinner');

  const btnSubmit = document.querySelector("#formulario button[type='submit']");

  const btnReset = document.querySelector("#formulario button[type='reset']");

  //ANCHOR Asignar eventos

  // evento al abandonar campo
  inputEmail.addEventListener('input', validar);
  inputCC.addEventListener('input', validar);
  inputAsunto.addEventListener('input', validar);
  inputMensaje.addEventListener('input', validar);

  formulario.addEventListener('submit', enviarEmail);

  btnReset.addEventListener('click', function (e) {
    e.preventDefault();

    // Limpiar formulario
    resetFormulario();
  });

  // FUNCTION enviarEmail
  function enviarEmail(e) {
    e.preventDefault();
    const referencia = e.target.parentElement;

    // agregar y remueve las clases flex y hidden respectivamente
    spinner.classList.add('flex');
    spinner.classList.remove('hidden');

    // pasado 3 segundo se removera el splineer
    setTimeout(() => {
      spinner.classList.remove('flex');
      spinner.classList.add('hidden');

      // Limpiar formulario
      resetFormulario();

      limpiarAlertaFinal(referencia);
      // Crear una alerta
      const alertaExito = document.createElement('P');

      alertaExito.classList.add(
        'bg-green-500',
        'text-white',
        'p-2',
        'text-center',
        'rounded-lg',
        'mt-10',
        'font-bold',
        'text-sm',
        'uppercase'
      );

      alertaExito.textContent = 'Mensaje enviado Correctamente';

      formulario.appendChild(alertaExito);

      // remover mensaje
      setTimeout(() => {
        alertaExito.remove();
      }, 3000);
    }, 3000);
  }

  // FUNCTION función validar
  function validar(e) {
    const referencia = e.target.parentElement;

    console.log(`${e.target.id} => ${e.target.value}`);

    if (e.target.value.trim() === '' && e.target.id !== 'cc') {
      mostrarAlerta(`El Campo ${e.target.id}  es obligatorio`, referencia);
      email[e.target.id] = ''; //el objeto se asigna vacio para validar
      comprobarEmail();
      return;
    } 

    if (
      (!validarEmail(e.target.value.trim()) && e.target.id === 'email') ||
      (!validarEmail(e.target.value.trim()) && e.target.id === 'cc')
    ) {
      mostrarAlerta(`El Campo ${e.target.id} no es válido`, referencia);
      email[e.target.id] = '';
      comprobarEmail();
      return;
    }

    limpiarAlerta(referencia);

    // Asignar los valores al obejto literal

    // si en el objeto literal exista esta propiedad
    if (email.hasOwnProperty(e.target.id)) {
      email[e.target.id] = e.target.value.trim().toLowerCase();
    }

    comprobarEmail();
  }

  // FUNCTION mostrarAlerta
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

  //FUNCTION LimpiarAlerta
  function limpiarAlerta(referencia) {
    // Comprueba si ya existe una alerta, en la referencia
    const alerta = referencia.querySelector('.bg-red-600');
    if (alerta) {
      alerta.remove();
    }
  }

  function limpiarAlertaFinal(referencia) {
    // Comprueba si ya existe una alerta, en la referencia
    const alerta = referencia.querySelector('.bg-green-500');
    if (alerta) {
      alerta.remove();
    }
  }

  //FUNCTION validarEmail
  function validarEmail(email) {
    const regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    // validar email con expresión regular
    const resultado = regex.test(email);
    return resultado;
  }

  //FUNCTION comprobarEmail
  function comprobarEmail() {
    // crea un nuevo arreglo con valores del objeto, y poder manipularlo con includes para retornar true en caso este vacio un campo
    if (Object.values(email).includes('')) {
      btnSubmit.classList.add('opacity-50');
      btnSubmit.disabled = true;

      return;
    }
    btnSubmit.classList.remove('opacity-50');
    btnSubmit.disabled = false;
  }

  //FUNCTION resetFormulario
  function resetFormulario() {
    // Reiniciar los valores del objeto
    for (let clave in email) {
      email[clave] = '';
    }

    formulario.reset(); //reseteo de campos visual del formulario
    comprobarEmail();
  }
});
