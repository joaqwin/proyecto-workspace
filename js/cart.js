let productosComprados;
let largoInputs;
document.addEventListener("DOMContentLoaded", function(e){
    console.log('Se cargó el DOM');
    getJSONData(CART_INFO_URL+'25801'+EXT_TYPE).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            CurrentArray = resultObj.data;
            addCarrito(CurrentArray);
            addSubtotal(CurrentArray);
            productosComprados = JSON.parse(localStorage.getItem('carrito'));
            addProductoComprado(productosComprados);
            largoInputs = document.getElementsByClassName('inputs_carrito').length
            meterSubtotal();
            document.getElementById('A').addEventListener('input', function(e){
                addSubtotal(CurrentArray)
            })
        }
    });
});

function addCarrito(array){
    let htmlContentToAppend=`
    <tr class="tr_carrito" id=tabla_carrito>
        <td><img src="${array.articles[0].image}" class="img_carrito"></td>
        <td>${array.articles[0].name}</td>
        <td>${array.articles[0].unitCost}${array.articles[0].currency}</td>
        <td><input type="number" value="1" min="1" id="A"></td>
        <td id="subtotal_carrito"></td>
    </tr>   
    `
    document.getElementById('tabla_carrito').innerHTML += htmlContentToAppend;
}

function addSubtotal(array){
    let htmlContentToAppend = `
    ${array.articles[0].currency}${array.articles[0].unitCost * document.getElementById('A').value}
    `
    document.getElementById('subtotal_carrito').innerHTML = htmlContentToAppend;
}
function addProductoComprado(array){
    let htmlContentToAppend;
    for (i=0; i<productosComprados.length; i++){
        htmlContentToAppend += ` 
        <tr class="tr_carrito">
            <td><img src="${JSON.parse(array[i]).image}" class="img_carrito"></td>
            <td>${JSON.parse(array[i]).name}</td>
            <td>${JSON.parse(array[i]).currency}${JSON.parse(array[i]).unitCost}</td>
            <td class="inputs_carrito"></td>
            <td class="subtotal" id=${i}>${JSON.parse(array[i]).currency}${JSON.parse(array[i]).unitCost}</td>
        </tr>   
    `
    }
    document.getElementById('tabla_carrito').innerHTML += htmlContentToAppend;
}

let i;

function botonesInputs_v2(i){
        let inputValor = parseInt(JSON.parse(productosComprados[i]).inputValue);
        let new_input = document.createElement('input');
        new_input.value= inputValor;
        new_input.type= 'number';
        new_input.min= 1;
        document.getElementsByClassName('inputs_carrito')[i].appendChild(new_input);
        new_input.addEventListener('input', function(){
            document.getElementsByClassName('subtotal')[i].innerHTML = `${JSON.parse(productosComprados[i]).unitCost * new_input.value}${JSON.parse(productosComprados[i]).currency}`
        })
}

function meterSubtotal(){
    for(j=0; j<largoInputs; j++){
        botonesInputs_v2(j)
    }
}

document.getElementById('limpiar_carrito').addEventListener('click', function(e){
    localStorage.removeItem('carrito');
    document.getElementById('tabla_carrito').innerHTML = "";
    addCarrito(CurrentArray);
    addSubtotal(CurrentArray);
})



