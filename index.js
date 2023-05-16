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
    resultado_cdt.innerHTML = `<p>Si inviertes ${'$'+monto.value} a ${plazo.value} meses recibirás ganancias aproximadas de <strong> ${'$'+Intl.NumberFormat('de-DE').format(resultado)} </strong></p><br><p>Ten en cuenta a este valor ya se le restó la retefuente (4% sobre tus ganancias)</p>`;
})

function calcularCDT(valorCDT, plazoCdt, tasaInteres){
    plazoCdt = plazoCdt * 30;
    console.log("valorCDT => " + valorCDT);
    valorCDT = parseInt(valorCDT);
    tasaPeriodica = (Math.pow(1 + tasaInteres/100, plazoCdt/360)-1)*100;
    interesGenerado = (tasaPeriodica / 100) * valorCDT;
    retencion = interesGenerado * 4 / 100;
    ingresosTotales = interesGenerado - retencion;

    return ingresosTotales;
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
    resultado_credito.innerHTML = `<p>Si solicitas  ${'$'+monto.value} a ${plazo.value} meses tendrás cuotas aproximadas de ${'$'+Intl.NumberFormat('de-DE').format(resultado)}</p>
    <p>Es probable que termines pagando un total de ${'$'+Intl.NumberFormat('de-DE').format(resultado*plazoSimular)}.</p>
    <p style="font-size: 12px;">*Este valor no incluye otros conceptos que la entidad pueda cobrar dentro del crédito.</p>`;
})

function calcularCuota(monto, plazo, tasa) {
  const interesMensual = tasa / 1200; // 12 meses en un año, y dividimos la tasa anual por 12
  const cuotaMensual = monto * interesMensual / (1 - Math.pow(1 + interesMensual, -plazo));
  return cuotaMensual.toFixed(2); // Redondeamos el resultado a dos decimales
}

// Lógica simular ahorro

let calcular_ahorro = document.getElementById('calcular_ahorro'); 
calcular_ahorro.addEventListener("click", () => {

    let montoAhorro = document.getElementById('montoAhorro');
    let cuotasAhorro = document.getElementById('cuotasAhorro');
    let valorCuota = document.getElementById('valorAhorro');
    let frecuenciaAhorro = document.getElementById('frecuenciaAhorro');

    let montoSimular = montoAhorro.value.replaceAll(".", "");
    montoSimular = montoSimular.replaceAll(",", "");
    montoSimular = parseInt(montoSimular);

    let cuotasSimular = cuotasAhorro.value.replaceAll(".", "");
    cuotasSimular = cuotasSimular.replaceAll(",", "");
    cuotasSimular = parseInt(cuotasSimular);

    let valorSimular = valorCuota.value.replaceAll(".", "");
    valorSimular = valorSimular.replaceAll(",", "");
    valorSimular = parseInt(valorSimular);

    if (isNaN(montoSimular) || isNaN(cuotasSimular) || isNaN(valorSimular) || frecuenciaAhorro.value == '') { alert("Por favor valida todos los datos ingresados"); return;}

    let periocidad = "";
    let factor = 1;

    // let tasa = calcularTasa( montoSimular, cuotasSimular, valorSimular);
    //  $ 1066185

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

    resultado_ahorro.innerHTML = `<p>Si tienes responsabilidades por  ${'$'+valorCuota.value} tendrás que ahorrar aproximadamente
    ${periocidad} ${'$'+Intl.NumberFormat('de-DE').format(resultado)}.</p>
    <p>Recuerda que un buen puntaje de crédito te abre las puertas de las entidades financieras.</p>`;
    // if( tasa == null ){
    // } else {
    //     resultado_ahorro.innerHTML = `<p>Tu crédito tiene una tasa aproximada de ${tasa}.</p><p>Recuerda que la compra de cartera suele ser una opción interesante para disminuir tu pago de intereses pero debes estudiar bien si es viable.</p><p>Si tienes responsabilidades por  ${'$'+valorCuota.value} tendrás que ahorrar aproximadamente ${periocidad} ${'$'+Intl.NumberFormat('de-DE').format(resultado)}</p><p>Recuerda que cumplir tus responsabilidades financieras te abre puertas</p>`;
    // }
})

function calcularTasa(monto, plazo, cuotaDeseada) {
    let tasaInicial = 0.01; // Tasa de interés inicial para comenzar a iterar
    let tasaActual = tasaInicial;
    let cuotaActual = calcularCuota(monto, plazo, tasaActual);

    while (Math.abs(cuotaActual - cuotaDeseada) > 0.5) { // Iterar mientras la diferencia sea mayor a 0.01
        console.log( tasaActual + " Diferencia :" + Math.abs(cuotaActual - cuotaDeseada));
        tasaActual += 0.01; // Incrementar la tasa en 0.01
        cuotaActual = calcularCuota(monto, plazo, tasaActual);
        // 1066185
        // console.log("Cuota actual" + cuotaActual);
        // console.log("Tasa actual" + tasaActual);
        if (tasaActual > 100) { // Salir del ciclo si la tasa supera un límite razonable
            console.log("La función no converge");
            return null;
        }
    }

    return tasaActual.toFixed(2); // Redondear la tasa a dos decimales y devolverla
}



function calcularDerivada(monto, plazo, tasa) {
    const interesMensual = tasa / 1200;
    const denominador = Math.pow(1 + interesMensual, -plazo);
    return monto * denominador / Math.pow(1 - denominador, 2) * (-plazo * interesMensual - 1);
}

function calcularTIEA(monto, cuotas, valorCuota) {
    const i = (valorCuota / monto - 1) * 100;
    const n = cuotas;
    const tiea = ((1 + i / 100) ** n - 1) * 100;
    return tiea.toFixed(2); // Redondeamos a dos decimales
}

function calcularAhorro(monto, plazo, tasa) {
  const interesMensual = tasa / 1200; // 12 meses en un año, y dividimos la tasa anual por 12
  const cuotaMensual = monto * interesMensual / (1 - Math.pow(1 + interesMensual, -plazo));
  return cuotaMensual.toFixed(2); // Redondeamos el resultado a dos decimales
}
