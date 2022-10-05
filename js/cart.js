let productos_comprados;
document.addEventListener("DOMContentLoaded", function(e){
    console.log('Se cargó el DOM');
    getJSONData(CART_INFO_URL+'25801'+EXT_TYPE).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            CurrentArray = resultObj.data;
            productos_comprados = JSON.parse(localStorage.getItem('carrito')+'}')
            addCarrito(CurrentArray);
            /*addSoldCount(CurrentArray);*/
            addProductocomprado(productos_comprados);
            /*document.getElementById('A').addEventListener('input', function(e){
                addSoldCount(CurrentArray)
                console.log('hola')
            })*/
        }
    });
});

function addCarrito(array){
    let htmlContentToAppend=`
    <tr class="tr_carrito">
        <td><img src="${array.articles[0].image}" class="img_carrito"></td>
        <td>${array.articles[0].name}</td>
        <td>${array.articles[0].unitCost}${array.articles[0].currency}</td>
        <td><input type="number" value="${array.articles[0].count}" class="inputs_carrito"></td>
        <td><td>
    </tr>   
    `
    document.getElementById('tabla_carrito').innerHTML += htmlContentToAppend;
}

/*function addSoldCount(array){
    let htmlContentToAppend = `
    <td>${array.articles[0].currency}${array.articles[0].unitCost * document.getElementsByClassName('inputs_carrito').value}</td>
    `
    document.getElementById('subtotal_carrito').innerHTML = htmlContentToAppend;
}*/
contador_carrito = parseInt(localStorage.getItem('contador'));
function addProductocomprado(array){
    let htmlContentToAppend;
    for (i=1; i<contador_carrito; i++){
        htmlContentToAppend += ` 
        <tr class="tr_carrito">
            <td><img src="${array[i].image}" class="img_carrito"></td>
            <td>${array[i].name}</td>
            <td>${array[i].unitCost}${array[i].currency}</td>
            <td><input type="number" value="1" class="inputs_carrito"></td>
            <td><td>
        </tr>   
    `
    }
    document.getElementById('tabla_carrito').innerHTML += htmlContentToAppend;
}