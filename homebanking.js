//Declaración de variables
var nombreUsuario = "Karina Boiola";
var saldoCuenta = 10000;
var limiteExtraccion = 1000;
var agua = 350;
var telefono = 425;
var luz = 210;
var internet = 570;
var cuentaAmiga1 = "1234567";
var cuentaAmiga2 = "7654321";
var codigoSeguridad = "1234";

//Ejecución de las funciones que actualizan los valores de las variables en el HTML.
window.onload = function () {
    iniciarSesion();
    cargarNombreEnPantalla(nombreUsuario);
    actualizarSaldoEnPantalla(saldoCuenta);
    actualizarLimiteEnPantalla(limiteExtraccion);
}

//Funciones que tenes que completar

function cambiarLimiteDeExtraccion() {
    var nuevoLimiteExtraccion = parseInt(prompt("Ingresá nuevo límite de extracción"));

    if (nuevoLimiteExtraccion == null || isNaN(nuevoLimiteExtraccion)) {
        alert("¡NO HAS INGRESADO UN NUEVO LÍMITE DE EXTRACCIÓN!");
    } else {
        limiteExtraccion = nuevoLimiteExtraccion;
        actualizarLimiteEnPantalla();
        alert("Tu nuevo límite de extracción es: $ " + limiteExtraccion);
    }
}

function extraerDinero() {
    var saldoAnterior = saldoCuenta;
    var cantidadDineroExtraido = parseInt(prompt("Ingresá el importe a extraer"));
    var hayDineroDisponible = cantidadDineroExtraido < saldoCuenta;
    var esMultiploDe100 = cantidadDineroExtraido % 100 === 0;
    var noSuperaLimiteExtraccion = cantidadDineroExtraido < limiteExtraccion;

    if (cantidadDineroExtraido == null || isNaN(cantidadDineroExtraido)) {
        alert("¡NO HAS INGRESADO UN IMPORTE A EXTRAER!");
    } else if (hayDineroDisponible == true && esMultiploDe100 == true && noSuperaLimiteExtraccion == true) {
        saldoCuenta = restar(cantidadDineroExtraido);
        alert("Has realizado una extracción."+"\n"+"Tu saldo anterior: $ " + saldoAnterior + "\n" + "Tu saldo actual: $ " + saldoCuenta + "\n" + "Has extraído: $ " + cantidadDineroExtraido);;
        actualizarSaldoEnPantalla();
    } else if (hayDineroDisponible == false) {
        alert("¡NO HAY DINERO DISPONIBLE!");
    } else if (esMultiploDe100 == false) {
        alert("¡SOLO ENTREGA BILLETES DE 100!");
    } else if (noSuperaLimiteExtraccion == false) {
        alert("¡SUPERA EL LIMITE DE EXTRACCION!");
    }
}

function depositarDinero() {
    var saldoAnterior = saldoCuenta;
    var cantidadDineroDepositado = parseInt(prompt("Ingresá el importe a depositar"));

    if (cantidadDineroDepositado == null || isNaN(cantidadDineroDepositado)) {
        alert("¡INGRESÁ UN IMPORTE VÁLIDO!");
    } else {
        saldoCuenta = sumar(cantidadDineroDepositado);
        actualizarSaldoEnPantalla();
        alert("Has realizado un depósito."+"\n"+"Tu saldo anterior: $ "+saldoAnterior+"\n"+"Tu saldo actual: $ "+saldoCuenta+"\n"+"Has depositado: $ "+cantidadDineroDepositado);
        return saldoCuenta;
    }

}

function pagarServicio() {
    var opcionCliente = parseInt(prompt("Ingresá el número que corresponda con el servicio que querés pagar.\n1 -Agua\n2 -Luz\n3 -Internet\n4 -Teléfono"))
    var saldoAnterior = saldoCuenta;

    if (opcionCliente == null || isNaN(opcionCliente)) {
        alert ("¡NO HAS INGRESADO EL SERVICIO QUE DESEÁS PAGAR!"+"\n"+"Por favor, ingresá una opción válida.");
    } else {
    switch (opcionCliente) {
        case 1:
            debitarServicio(agua);
            break;

        case 2:
            debitarServicio(luz);
            break;

        case 3:
            debitarServicio(internet);
            break;

        case 4:
            debitarServicio(telefono);
            break;

        default:
            alert("¡NO EXISTE ESA OPCIÓN!"+"\n"+"Por favor, seleccioná una opción válida");
        }
    }

    actualizarSaldoEnPantalla();

    function debitarServicio(valorServicio) {
        if (valorServicio > saldoCuenta) {
            alert("¡NO HAY DINERO SUFICIENTE!");
        } else {
            saldoCuenta = restar(valorServicio);
            alert("Pagaste un servicio." + "\n" + "Tu saldo Anterior: $ " + saldoAnterior + "\n" + "Tu saldo actual: $ " + saldoCuenta);
        }
    }
}

//MUESTRA DOS ALERTAS!

function transferirDinero() {
    var montoParaTransferir = parseInt(prompt("Ingresá el monto que deseás transferir"));
    var saldoAnterior=saldoCuenta;

    if (montoParaTransferir == null || isNaN(montoParaTransferir)) {
        alert("¡INGRESÁ UN MONTO VÁLIDO PARA TRANSFERIR!");
    } else if (montoParaTransferir > saldoCuenta) {
        alert("¡NO HAY SALDO DISPONIBLE PARA REALIZAR LA TRANSFERENCIA!");
    } else {
        var cuentaSeleccionada = prompt("Ingresá el número de cuenta a la que deseás transferir.");
    } 
    
    if (cuentaSeleccionada === cuentaAmiga1 || cuentaSeleccionada === cuentaAmiga2) {
        saldoCuenta = restar(montoParaTransferir);
        actualizarSaldoEnPantalla();
        alert("Has realizado una transferencia."+"\n"+"Tu saldo anterior: $ "+saldoAnterior+"\n"+"Tu saldo actual: $ "+saldoCuenta);
    } else {
        alert("¡SOLO PODÉS TRANSFERIR DINERO A UNA CUENTA AMIGA!");
    }
}


function iniciarSesion() {
    var codigoIngresado = parseInt(prompt("INGRESÁ TU CÓDIGO DE SEGURIDAD"));

    if (codigoIngresado == codigoSeguridad) {
        alert("Bienvenidx, " + nombreUsuario + "\n" + "Ya podés comenzar a realizar operaciones.");
    } else {
        saldoCuenta = restar(saldoCuenta);
        alert("¡¡TU DINERO HA SIDO RETENIDO POR CUESTIONES DE SEGURIDAD!!");
        actualizarSaldoEnPantalla();
    }
}

function depositarCheque() {
    var montoDecheque = parseInt(prompt("Ingresá el monto del cheque que querés depositar."));
    if (montoDecheque == null || isNaN(montoDecheque)) {
      alert("Por favor, ingresá un importe válido");
    } else {
        saldoCuenta = sumar(montoDecheque);
        alert("Has depositado un cheque por el monto de: $ "+montoDecheque);
        actualizarSaldoEnPantalla();
      }
  }

//Funciones que actualizan el valor de las variables en el HTML
function cargarNombreEnPantalla() {
    document.getElementById("nombre").innerHTML = "Bienvenido/a " + nombreUsuario;
}

function actualizarSaldoEnPantalla() {
    document.getElementById("saldo-cuenta").innerHTML = "$" + saldoCuenta;
}

function actualizarLimiteEnPantalla() {
    document.getElementById("limite-extraccion").innerHTML = "Tu límite de extracción es: $" + limiteExtraccion;
}

//Funciones creadas para la consigna

function restar(cantidad) {
    return saldoCuenta - cantidad;
}

function sumar(cantidad) {
    return saldoCuenta + cantidad;
}

//larara
//larara
