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
;
let arrayProductosComprados = [];
let infoProductoComprado;
let estaEnElCarrito = false;
let arrayProductosCompradosJSON = [];
let productoCompradoObjeto;

function carrito(array){
  if (localStorage.getItem('carrito') === null){
      arrayProductosComprados = [];
      infoProductoComprado = `{"name":"${array.name}", "unitCost":"${array.cost}", "currency":"${array.currency}", "image":"${array.images[0]}", "inputValue":"1"}`
      arrayProductosComprados.push(infoProductoComprado);
      localStorage.setItem('carrito', JSON.stringify(arrayProductosComprados));
  }
  else{
    i=0;
    arrayProductosComprados = JSON.parse(localStorage.getItem('carrito'));
    do {
      if (JSON.parse(arrayProductosComprados[i]).name === array.name){
        productoCompradoObjeto = JSON.parse(arrayProductosComprados[i]);
        productoCompradoObjeto.inputValue++;
        arrayProductosComprados[i] = JSON.stringify(productoCompradoObjeto)
        localStorage.setItem('carrito', JSON.stringify(arrayProductosComprados));
        estaEnElCarrito = true;
      }
      i++;
    }
    while ((i < arrayProductosComprados.length) && (JSON.parse(arrayProductosComprados[i]).name !== array.name)); 
    
    if(!estaEnElCarrito){ 
      infoProductoComprado = `{"name":"${array.name}", "unitCost":"${array.cost}", "currency":"${array.currency}", "image":"${array.images[0]}", "inputValue":"1"}`
      arrayProductosComprados.push(infoProductoComprado);
      localStorage.setItem('carrito', JSON.stringify(arrayProductosComprados));
    };
  };
};

