const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const AUTOS_URL = "https://japceibal.github.io/emercado-api/cats_products/101.json";
const EXT_TYPE = ".json";

let showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

let getJSONData = function(url){
    let result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}

let usuario = document.getElementById('container-usuario');
usuario.innerHTML = `
<div class="dropdown">
  <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    ${localStorage.getItem('email')}
  </button>
  <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
    <a class="dropdown-item" href="cart.html">Mi carrito</a>
    <a class="dropdown-item" href="my-profile.html">Mi perfil</a>
    <a class="dropdown-item" href="index.html" onclick="localStorage.removeItem('email')">Cerrar sesión</a>
  </div>
</div>
    `



    let carrito_string;
    if (localStorage.getItem('carrito') === null){
      carrito_string = "";
    }
    else{
      carrito_string= localStorage.getItem('carrito');
    }
let info_producto_comprado;
let array_productos_comprado =[];
let contador = parseInt(localStorage.getItem('contador'));
function carrito(array){
  if (contador === 1){
    info_producto_comprado = `{"${contador}": {"name":"${array.name}", "unitCost":"${array.cost}", "currency":"${array.currency}", "image":"${array.images[0]}"}`
    contador++
    console.log('1') 
  }
  else {
    info_producto_comprado = `, {"${contador}": {"name":"${array.name}", "unitCost":"${array.cost}", "currency":"${array.currency}", "image":"${array.images[0]}"}`
    contador++
    console.log('2')
  }
  array_productos_comprado.push(info_producto_comprado);
  localStorage.setItem('carrito', carrito_string + array_productos_comprado)
  localStorage.setItem('contador', contador);
}
