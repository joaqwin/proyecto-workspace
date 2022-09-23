CurrentArray = [];
array_filtro = [];

function showCategoriesList(array){
    let htmlContentToAppend = "";

    for(let i = 0; i < array.length; i++){ 
        let category = array[i];
        htmlContentToAppend += `
        <div onclick="localStorage.setItem('ID-prod', ${category.id}); window.location.href='product-info.html'" class="list-group-item list-group-item-action articulos-buscador">
            <div class="row">
            <div class="col-3">
                    <img src="` + category.image + `" alt="product image" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <div class="mb-1">
                        <h4>`+ category.name +` - `+ category.currency +` `+category.cost +`</h4> 
                        <p> `+ category.description +`</p> 
                        </div>
                        <small class="text-muted">` + category.soldCount + ` vendidos</small> 
                    </div>

                </div>
                </div>
                </div>
                `
                document.getElementById("cat-list-container").innerHTML = htmlContentToAppend;
            }
}

document.addEventListener("DOMContentLoaded", function(e){
    console.log('Se cargó el DOM');
    getJSONData(PRODUCTS_URL+localStorage.getItem('catID')+EXT_TYPE).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            CurrentArray = resultObj.data;
            array_filtro = CurrentArray.products;
            showCategoriesList(CurrentArray.products);
        }
    });
});

let filtro_menor = document.getElementById('filtro_menor');
filtro_menor.addEventListener('click', function(e){
    e.preventDefault();
    array_filtro.sort(function(a,b){
        if (a.cost < b.cost) {return -1;}
        if (a.cost > b.cost) {return 1;}
        return 0;
    });
    showCategoriesList(array_filtro);
});

let filtro_mayor = document.getElementById('filtro_mayor');
filtro_mayor.addEventListener('click', function(e){
    e.preventDefault();
    array_filtro.sort(function(a,b){
        if (a.cost < b.cost) {return 1;}
        if (a.cost > b.cost) {return -1;}
        return 0;
    });
    showCategoriesList(array_filtro);
});

let relevancia = document.getElementById('relevancia');
relevancia.addEventListener('click', function(e){
    e.preventDefault();
    array_filtro.sort(function(a,b){
        if (a.soldCount < b.soldCount) {return 1;}
        if (a.soldCount > b.soldCount) {return -1;}
        return 0;
    });
    showCategoriesList(array_filtro);
});

let max = document.getElementById('max');
let min = document.getElementById('min');
document.getElementById('filtrar').addEventListener('click', function(e){
    if (max.value == "" && min.value == ""){
        showCategoriesList(array_filtro)    
    } else{
        if (min.value == ""){
            min.value = 0;
        }
        else if(max.value == "") {
            max.value = 35100000;
        }
        let lista_filtrada = CurrentArray.products.filter(function(a) {
        return (a.cost >= min.value && a.cost <= max.value);
    });
        array_filtro = lista_filtrada;
        showCategoriesList(array_filtro);
    }
});


document.getElementById('Volver').addEventListener('click', function(e){
    array_filtro = CurrentArray.products;
    showCategoriesList(array_filtro);
});
let buscador = document.getElementById('buscador'); 
document.getElementById('buscador').addEventListener('keyup', function(e){
    console.log(buscador.value)
    document.querySelectorAll(".articulos-buscador").forEach(art =>{
        if (art.textContent.toLowerCase().includes(buscador.value.toLowerCase())){
            art.classList.remove("filtro")
            
        }else{
            art.classList.add("filtro")
        }
        
    })
});