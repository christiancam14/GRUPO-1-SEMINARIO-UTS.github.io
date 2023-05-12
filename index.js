// Seleccionamos todos los elementos de radio del grupo
const opciones = document.querySelectorAll('input[name="opcion_simulador"]');
const contenedores = document.querySelectorAll('.contenedor');
const menu = document.querySelector('#menu');

// Obtiene el ancho de la pantalla
// const anchoPantalla = window.innerWidth;

// alert(`El ancho de la pantalla es: ${anchoPantalla}px`);


// Añadimos un evento de cambio a cada elemento de radio
opciones.forEach((opcion) => {
    opcion.addEventListener('change', (event) => {
        for(let i = 0; i < contenedores.length; i++) {
            contenedores[i].style.display = 'none';
        }
        menu.checked = false;
        contenedores[event.target.value].style.display = 'flex';

    });
});
