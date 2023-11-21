// validamos que se descargo todo el codigo html
document.addEventListener('DOMContentLoaded', () => {
  const email = {
    email: '',
    asunto: '',
    mensaje: '',
  };

  // Seleccionar los elementos de la interfaz
  const inputEmail = document.querySelector('#email');
  const inputAsunto = document.querySelector('#asunto');
  const inputMensaje = document.querySelector('#mensaje');

  const formulario = document.querySelector('#formulario');
  const spinner = document.querySelector('#spinner');

  const btnSubmit = document.querySelector("#formulario button[type='submit']");

  const btnReset = document.querySelector("#formulario button[type='reset']");

  //ANCHOR Asignar eventos

  // evento al abandonar campo
  inputEmail.addEventListener('input', validar);
  inputAsunto.addEventListener('input', validar);
  inputMensaje.addEventListener('input', validar);

  formulario.addEventListener('submit', enviarEmail);

  btnReset.addEventListener('click', function (e) {
    e.preventDefault();

    // Reiniciar los valores del objeto
    for (let clave in email) {
      email[clave] = '';
    }

    formulario.reset(); //reseteo de campos visual del formulario
    comprobarEmail();
  });

  function enviarEmail(e) {
    e.preventDefault();

    if (spinner.classList.contains("hidden")) {
      spinner.classList.add('flex');
      spinner.classList.remove('hidden');
      formulario.reset(); //reseteo de campos visual del formulario
      comprobarEmail();
      console.log('enviando..');
    }
  }

  // función validar
  function validar(e) {
    const referencia = e.target.parentElement;

    if (e.target.value.trim() === '') {
      mostrarAlerta(`El Campo ${e.target.id}  es obligatorio`, referencia);
      email[e.target.id] = ''; //el objeto se asigna vacio para validar
      comprobarEmail();
      return;
    }

    if (!validarEmail(e.target.value) && e.target.id === 'email') {
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
});
