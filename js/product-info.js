function showCategoriesList(array){
    let htmlContentToAppend = "";

    
    let category = array;
    htmlContentToAppend += `
    <button id="boton_comprar">Comprar</button>
    <div id="cajita"
        <div id="info-producto">
        <div><h2>${category.name}</h2></div>
        <hr><br>
        <div><p><strong>Precio:</strong> ${category.cost} ${category.currency} <div>
        <div><p><strong>Descripcion:</strong> ${category.description}<div>
        <div><p><strong>Categoria:</strong> ${category.category}</p><div>
        <div><p><strong>Cantidad de vendidos:</strong> ${category.soldCount}</p></div>
        </hr>
        <p><strong>Imágenes relacionadas:</strong><p>
        <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="3" aria-label="Slide 3"></button>
  </div>
  <div class="carousel-inner carrusel_chiquito">
    <div class="carousel-item active">
      <img src="${category.images[0]}" class="d-block w-100 img" alt="...">
    </div>
    <div class="carousel-item">
      <img src="${category.images[1]}" class="d-block w-100 img" alt="...">
    </div>
    <div class="carousel-item">
      <img src="${category.images[2]}" class="d-block w-100 img" alt="...">
    </div>
    <div class="carousel-item">
      <img src="${category.images[3]}" class="d-block w-100 img" alt="...">
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Anterior</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Siguiente</span>
  </button>
</div>
        <br>
        <hr>
            `
            document.getElementById("caja").innerHTML += htmlContentToAppend;
            }

function showComments(array){
    for(let i = 0; i < array.length; i++){
        contenido_estrellas_html =""; 
        let category = array[i];
        document.getElementById('comments').innerHTML += 
        `
        <div class="div-comments bg-light">
            <p class="com-p"><strong>${category.user}</strong>  ${category.dateTime} ${showStars(parseInt(category.score))}<p>
            <p class="com-p">${category.description}</p>
        </div>
        `
    }    
}
let contenido_estrellas_html = "";
function showStars(num_estrellas){
    for(let i=0; i <=4; i++){
        if (i <= num_estrellas-1){
            contenido_estrellas_html += `<span class="fa fa-star checked"></span>`
        }else{
            contenido_estrellas_html += `<span class="fa fa-star"></span>`
        }
    }
    return contenido_estrellas_html;
}

document.addEventListener("DOMContentLoaded", function(e){
    console.log('Se cargó el DOM');
    getJSONData(PRODUCT_INFO_URL+localStorage.getItem('ID-prod')+EXT_TYPE).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            CurrentArray = resultObj.data;
            showCategoriesList(CurrentArray);
            showRelatedProducts(CurrentArray);
            document.getElementById('boton_comprar').addEventListener('click', function(e){
                carrito(CurrentArray);
                console.log('hola')
            });
        }
    });
        getJSONData(PRODUCT_INFO_COMMENTS_URL+localStorage.getItem('ID-prod')+EXT_TYPE).then(function(resultObj){
            if (resultObj.status === "ok")
            {
                comentarios = resultObj.data;
                console.log(comentarios);
                showComments(comentarios)
            }
        })
});

const tiempoTranscurrido = Date.now();
const hoy = new Date(tiempoTranscurrido);
let select_estrellas = document.getElementById('select_estrellas');
let textito = document.getElementById('textito');
document.getElementById('boton_comentar').addEventListener('click', function(e){
    if (textito.value == "" || getCharacterLength(textito.value) > 100 || localStorage.getItem('email') == null){
        alert('Debe escribir algo que no supere los 100 cáracteres o iniciar sesión para comentar.')
    }else{
        let fecha = `${hoy.getFullYear()}-0${hoy.getUTCMonth()+1}-${hoy.getDate()} ${hoy.getHours()}:${hoy.getMinutes()}:${hoy.getSeconds()}` 
        contenido_estrellas_html = "";
        document.getElementById('comments').innerHTML += 
        `
        <div class="div-comments bg-light">
            <p class="com-p"><strong>${localStorage.getItem('email')}</strong> ${fecha} ${showStars(parseInt(select_estrellas.value))}<p>
            <p class="com-p">${textito.value}</p>
        </div>
        `
        textito.value = "";
    }
})

function getCharacterLength(str) {
    return [...str].length;
  }

function showRelatedProducts(array){
    let htmlContentToAppend = "";
    let category = array;
    for (i=0; i<category.relatedProducts.length; i++){
        htmlContentToAppend += `
        <div class="producto_relacionado" onclick="localStorage.setItem('ID-prod', ${category.relatedProducts[i].id}); window.location.href='product-info.html'">
            <img src="${category.relatedProducts[i].image}" class="img-thumbnail img-galery bg-light">
            <p>${category.relatedProducts[i].name}<p>
        </div>
            `
    }
            document.getElementById("productos_relacionados").innerHTML = htmlContentToAppend;

}


