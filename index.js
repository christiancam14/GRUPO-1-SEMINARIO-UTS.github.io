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

function NumerosDecimales(string){
    //Solo numeros decimales
    let out = '';
    let filtro = '1234567890.';
    //Caracteres validos
	
    //Recorrer el texto y verificar si el caracter se encuentra en la lista de validos 
    for (let i=0; i<string.length; i++)
        if (filtro.indexOf(string.charAt(i)) != -1) {
            //Permitir solo un punto decimal
            if (string.charAt(i) === '.') {
                if (out.indexOf('.') === -1) {
                    out += string.charAt(i);
                }
            } else {
                //Se añaden a la salida los caracteres validos
                out += string.charAt(i);
            }
        }
	
    //Retornar valor filtrado
    return out;
}

function Numeros(string) {
    var out = "";
    var filtro = "1234567890";
    for (var i = 0; i < string.length; i++)
        if (filtro.indexOf(string.charAt(i)) != -1)
            out += string.charAt(i);
    out = new Intl.NumberFormat('de-DE').format(out);
    return out
}


// Lógica simular CDT

let btn_calcular_cdt = document.getElementById('calcular_cdt'); 
btn_calcular_cdt.addEventListener("click", () => {

    let monto = document.getElementById('montoCdt');
    let plazo = document.getElementById('plazoCdt');
    let tasa = document.getElementById('tasaCdt');

    let montoSimular = monto.value.replaceAll(".", "");
    montoSimular = montoSimular.replaceAll(",", "");
    montoSimular = parseInt(montoSimular);

    let plazoSimular = plazo.value.replaceAll(".", "");
    plazoSimular = plazoSimular.replaceAll(",", "");
    plazoSimular = parseInt(plazoSimular);

    let tasaSimular = parseFloat(tasa.value);

    if (isNaN(montoSimular) || isNaN(plazoSimular) || isNaN(tasaSimular)) { alert("Por favor valida todos los datos ingresados"); return;}

    let resultado = calcularCDT(montoSimular, plazoSimular, tasaSimular);

    let resultado_cdt = document.getElementById('resultado_cdt');
    resultado_cdt.innerHTML = `<p>Si inviertes ${'$'+monto.value} a ${plazo.value} meses recibirás ganancias por ${'$'+Intl.NumberFormat('de-DE').format(resultado)}</p><p>Ten en cuenta que debes restar la retenfuente y el valor final puede variar</p>`;
})

function calcularCDT(monto, plazo, tasa) {
    let interes = (tasa) / 12;
    let valorFinal = (monto * (1 + interes / 100) ** plazo) - monto;
    
    return valorFinal.toFixed(2);
}

// Lógica simular crédito

let calcular_credito = document.getElementById('calcular_credito'); 
calcular_credito.addEventListener("click", () => {

    let monto = document.getElementById('montoCredito');
    let plazo = document.getElementById('plazoCredito');
    let tasa = document.getElementById('tasaCredito');

    let montoSimular = monto.value.replaceAll(".", "");
    montoSimular = montoSimular.replaceAll(",", "");
    montoSimular = parseInt(montoSimular);

    let plazoSimular = plazo.value.replaceAll(".", "");
    plazoSimular = plazoSimular.replaceAll(",", "");
    plazoSimular = parseInt(plazoSimular);

    let tasaSimular = parseFloat(tasa.value);

    if (isNaN(montoSimular) || isNaN(plazoSimular) || isNaN(tasaSimular)) { alert("Por favor valida todos los datos ingresados"); return;}

    let resultado = calcularCuota(montoSimular, plazoSimular, tasaSimular);

    let resultado_credito = document.getElementById('resultado_credito');
    resultado_credito.innerHTML = `<p>Si solicitas  ${'$'+monto.value} a ${plazo.value} meses tendrás cuotas de ${'$'+Intl.NumberFormat('de-DE').format(resultado)}</p><p>Terminarás pagando apróximadamente ${'$'+Intl.NumberFormat('de-DE').format(resultado*plazoSimular)}</p>`;
})

function calcularCuota(monto, plazo, tasa) {
  const interesMensual = tasa / 1200; // 12 meses en un año, y dividimos la tasa anual por 12
  const cuotaMensual = monto * interesMensual / (1 - Math.pow(1 + interesMensual, -plazo));
  return cuotaMensual.toFixed(2); // Redondeamos el resultado a dos decimales
}

// Lógica simular ahorro

let calcular_ahorro = document.getElementById('calcular_ahorro'); 
calcular_ahorro.addEventListener("click", () => {

    let nombre = document.getElementById('nombreAhorro');
    let valorCuota = document.getElementById('valorAhorro');
    let frecuenciaAhorro = document.getElementById('frecuenciaAhorro');

    let valorSimular = valorCuota.value.replaceAll(".", "");
    valorSimular = valorSimular.replaceAll(",", "");
    valorSimular = parseInt(valorSimular);

    // if (isNaN(montoSimular) || isNaN(plazoSimular) || isNaN(tasaSimular)) { alert("Por favor valida todos los datos ingresados"); return;}

    let periocidad = "";
    let factor = 1;

    switch (frecuenciaAhorro.value){
        case "Diario":
            periocidad = "diariamente";
            factor = 30;
            break;
        case "Semanal":
            periocidad = "semanalmente";
            factor = 4;
            break;
        case "Quincenal":
            periocidad = "quincenalmente";
            factor = 2;
            break;
        case "Mensual":
            periocidad = "mensualmente";
            factor = 1;
            break;
    }
    
    let resultado = valorSimular / factor;
    let resultado_ahorro = document.getElementById('resultado_ahorro');
    resultado_ahorro.innerHTML = `<h2>${nombre.value}</h2><p>Si tienes responsabilidades por  ${'$'+valorCuota.value} tendrás que ahorrar aproximadamente ${periocidad} ${'$'+Intl.NumberFormat('de-DE').format(resultado)}</p><p>Recuerda que cumplir tus responsabilidades financieras te abre puertas</p>`;
})

function calcularAhorro(monto, plazo, tasa) {
  const interesMensual = tasa / 1200; // 12 meses en un año, y dividimos la tasa anual por 12
  const cuotaMensual = monto * interesMensual / (1 - Math.pow(1 + interesMensual, -plazo));
  return cuotaMensual.toFixed(2); // Redondeamos el resultado a dos decimales
}


