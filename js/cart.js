let productosComprados;
let largoInputs;
document.addEventListener("DOMContentLoaded", function(e){
    console.log('Se cargó el DOM');
    getJSONData(CART_INFO_URL+'25801'+EXT_TYPE).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            CurrentArray = resultObj.data;
            productosComprados = JSON.parse(localStorage.getItem('carrito'));
            addProductoComprado(productosComprados);
            largoInputs = document.getElementsByClassName('inputs_carrito').length
            meterSubtotal(largoInputs, botonesInputs_v2);
            meterBotonesEliminar(document.getElementsByClassName('eliminar-producto').length, eliminarProducto,
            document.getElementsByClassName('eliminar-producto'), document.getElementsByClassName('tr_carrito'));
            meterCostos();
        }
    });
});

function addProductoComprado(array){
    let htmlContentToAppend;
    for (i=0; i<productosComprados.length; i++){
        htmlContentToAppend += ` 
        <tr class="tr_carrito">
            <td><img src="${JSON.parse(array[i]).image}" class="img_carrito"></td>
            <td>${JSON.parse(array[i]).name}</td>
            <td>${JSON.parse(array[i]).currency}${JSON.parse(array[i]).unitCost}</td>
            <td class="inputs_carrito"></td>
            <td class="subtotal" id=${i}>${cambiarPesoADolar(JSON.parse(array[i]).currency, JSON.parse(array[i]).unitCost, JSON.parse(array[i]).inputValue) }</td>
            <td><button class="eliminar-producto btn-secondary">X</button></td>
        </tr>   
    `
    }
    document.getElementById('tabla_carrito').innerHTML += htmlContentToAppend;
}

function cambiarPesoADolar(moneda, precio, inputValue){
    let monedaAux = 'USD';
    let precioAux = precio * inputValue;
    let precioDolar = 41;
    if (moneda === 'UYU'){
        monedaAux = 'USD';
        precioAux = inputValue * (precio / precioDolar).toFixed(0);
    }
    return monedaAux + ' ' + precioAux;
}

let i;

function botonesInputs_v2(i){
        let inputValor = parseInt(JSON.parse(productosComprados[i]).inputValue);
        let new_input = document.createElement('input');
        new_input.value= inputValor;
        new_input.type= 'number';
        new_input.min= 1;
        new_input.classList.add('inputs_subtotal')
        document.getElementsByClassName('inputs_carrito')[i].appendChild(new_input);
        new_input.addEventListener('input', function(){
            document.getElementsByClassName('subtotal')[i].innerHTML = `${JSON.parse(productosComprados[i]).unitCost * new_input.value}${JSON.parse(productosComprados[i]).currency}`;
            meterCostos();
        })
}

function meterSubtotal(largo, fun){
    for(j=0; j<largo; j++){
        fun(j)
    }
}
function limpiarCarrito(){
    localStorage.removeItem('carrito');
    document.getElementById('tabla_carrito').innerHTML = "";
    addCarrito(CurrentArray);
    addSubtotal(CurrentArray);
};
document.getElementById('limpiar_carrito').addEventListener('click', function(e){
    limpiarCarrito();
});

// funcion para calcular la suma de los subtotales
function sumatoriaSubtotales(array_subtotales){
    let sumaSubtotales = 0;
    for(i=0; i<array_subtotales.length; i++){
        sumaSubtotales += parseInt(array_subtotales[i].textContent.split(' ')[1]); 
    }
    return sumaSubtotales;
} 

//funcion para mostrar los costos.
let subtotales = document.getElementsByClassName('inputs_subtotal');
function innerCostos(id, contenido){
    document.getElementById(id).innerHTML = contenido;
};

//funcion para ver que opción de envio eligió el usuario y así poder saber el porcentaje de envio.
function porcentajeDeEnvio(){
    let porcentajeCostoEnvio;
    if (document.getElementById('radio1').checked){
        porcentajeCostoEnvio = 0.12;
    } else if (document.getElementById('radio2').checked){
        porcentajeCostoEnvio = 0.07;
    } else{
        porcentajeCostoEnvio = 0.05;
    }
    return porcentajeCostoEnvio;
}

// funcion que muestra todos los costos (Total, subtotal, costo de envio)
function meterCostos(){
    innerCostos('subtotal-total', `USD ${sumatoriaSubtotales(document.getElementsByClassName('subtotal'))}`);
    innerCostos('costo-envio', `USD ${(parseInt(document.getElementById('subtotal-total').textContent.split(' ')[1]) * porcentajeDeEnvio()).toFixed(0)}`);
    innerCostos('costo-total', `USD ${parseInt(document.getElementById('subtotal-total').textContent.split(' ')[1])+ parseInt(document.getElementById('costo-envio').textContent.split(' ')[1])}`);
}

let radioModal1 = document.getElementById('radio-modal1');
radioModal1.checked = true;
let radioModal2 = document.getElementById('radio-modal2');
let formularioTarjeta = document.forms['tarjeta-form']; 
let formularioBanco = document.forms['banco-form'];
let formularioDireccion = document.forms['direccion-form'];

// funcion para deshabilitar una de las secciones de la forma de pago
function cambiarAtributoDisabled(formulario, estado){
    // estado debe ser un booleano
    for(i=0; i<formulario.length; i++){
        formulario[i].disabled = estado;
    }
}

// llamo la función para que al abrir por primera vez el modal ya solo quede una opción
cambiarAtributoDisabled(formularioBanco, true)

//un addeventlistener para que cuando se cambie de forma de pago se desahibilite la otra.
radioModal1.addEventListener('click', function(e){
    cambiarAtributoDisabled(formularioBanco, true)
    cambiarAtributoDisabled(formularioTarjeta, false)
});


radioModal2.addEventListener('click', function(e){
    cambiarAtributoDisabled(formularioTarjeta, true)
    cambiarAtributoDisabled(formularioBanco, false)
});

function cambiarTextoSeleccionarModal(){
    if (radioModal1.checked){
        document.getElementById('forma-de-pago-texto').innerHTML = 'Tarjeta de Crédito';
    } else{
        document.getElementById('forma-de-pago-texto').innerHTML = 'Transferencia Bancaria';
    }
};
//funcion para validar que todos los inputs de cantidad  tengan al menos 1 producto.
function validacionInputs(array){
    let sonTodosValidos = true;
    for (i=0; i<array.length; i++){
        if (JSON.parse(array[i].value < 1)){
            sonTodosValidos = false;
        }
    }
    return sonTodosValidos;
}

// alerta de compra exitosa
var alertPlaceholder = document.getElementById('liveAlertPlaceholder')
function alert(message, type) {
  var wrapper = document.createElement('div')
  wrapper.innerHTML = '<div class="alert alert-' + type + ' alert-dismissible" role="alert">' + message + '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>'

  alertPlaceholder.append(wrapper)
}
//funcion para agregar el feedback de la validacion de la forma de pago.
function agregarOSacarFeedback(){
    if (document.getElementById('forma-de-pago-texto').textContent === 'Seleccione una forma de pago'){
        document.getElementById('invalid-feedback-finalizar').innerHTML = 'Debe ingresar una forma de pago.';
        document.getElementById('invalid-feedback-finalizar').classList.add('d-block');
    } else{
        document.getElementById('invalid-feedback-finalizar').innerHTML ='';
    }
}
// funcion para revisar si hay al menos uno de los input radio de la direccion checkeado.
function radiosChecked(array){
    let hayUnoChecked = false;
    for (i=0; i<array.length; i++){
        if (array[i].checked){
            hayUnoChecked = true;
        }
    }
    return hayUnoChecked;
}

document.getElementById('finalizar-compra').addEventListener('click', function(e){
    e.preventDefault();
    formularioBanco.classList.add('was-validated');
    formularioTarjeta.classList.add('was-validated');
    formularioDireccion.classList.add('was-validated');
    agregarOSacarFeedback();
    let formularioDePagoAVerificar;
    if (radioModal1.checked){
        formularioDePagoAVerificar = formularioTarjeta;
    } else{
        formularioDePagoAVerificar = formularioBanco;
    }
    if (formularioDireccion.checkValidity() && formularioDePagoAVerificar.checkValidity() && 
    validacionInputs(document.getElementsByClassName('inputs_subtotal') 
    && (document.getElementById('forma-de-pago-texto').textContent !== 'Seleccione una forma de pago')) && 
    radiosChecked(document.getElementsByName('tipo-de-envio'))){
        alert('Has comprado correctamente!', 'success');
        limpiarCarrito();
    }
})

//desafiate entrega 6
function eliminarProducto(i, arrayBotonesEliminar, arrayFilaProducto){
    let arraySinElProductoEliminado = [];
    arrayBotonesEliminar[i].addEventListener('click', function(){
        arrayFilaProducto[i].innerHTML = "";
        arraySinElProductoEliminado = productosComprados.filter(prod => JSON.parse(prod).name !== JSON.parse(productosComprados[i]).name);
        console.log('hola')
        localStorage.setItem('carrito', JSON.stringify(arraySinElProductoEliminado));
        meterCostos();
    });
}

function meterBotonesEliminar(largo, fun, array1, array2){
    for(j=0; j<largo; j++){
        fun(j,array1,array2)
    }
}
