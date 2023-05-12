// Seleccionamos todos los elementos de radio del grupo
const opciones = document.querySelectorAll('input[name="opcion_simulador"]');
const contenedores = document.querySelectorAll('.contenedor');
console.log('Prueba');
console.log(contenedores);

// Añadimos un evento de cambio a cada elemento de radio
opciones.forEach((opcion) => {
    opcion.addEventListener('change', (event) => {
        for(let i = 0; i < contenedores.length; i++) {
            contenedores[i].style.display = 'none';
        }
        contenedores[event.target.value].style.display = 'flex';
        console.log(contenedores[event.target.value]);
    });
});
