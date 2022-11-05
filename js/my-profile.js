let nombre = document.getElementById('nombre');
let apellido = document.getElementById('apellido');
let email = document.getElementById('email');
let segundoNombre = document.getElementById('segundo-nombre');
let segundoApellido = document.getElementById('segundo-apellido');
let tel = document.getElementById('telefono');
let botonGuardarCambios = document.getElementById('boton-guardar-cambios');
let miBD = [];
let ultimoID = 0;

if (localStorage.getItem('ultimoID')){
    ultimoID = parseInt(localStorage.getItem('ultimoID'));
}

function generarID() {
    ultimoID++;
    return ultimoID;
}


function agregarAMIBD(){
    let perfilParaAgregar = {
        "nombre": nombre.value,
        "segundoNombre": segundoNombre.value,
        "apellido": apellido.value,
        "segundoApellido": segundoApellido.value,
        "email": email.value,
        "tel": tel.value,
        "id": generarID()
    };
    miBD.push(perfilParaAgregar);
    localStorage.setItem('info-perfil', JSON.stringify(miBD))
}

document.forms['formulario-perfil'].addEventListener('submit', function(e){
    e.preventDefault();
    console.log('hola')
    meterFeedback();
    if (validarCampos(nombre) && validarCampos(apellido) && validarCampos(email)){
        if (verificarSiYaEstaRegistrado()){
            meterFeedback();
            cambiarDatosDeUsuario();
        }
        else{
            meterFeedback();
            agregarAMIBD();       
        }    
    }
})

if (localStorage.getItem('info-perfil')){
    miBD = JSON.parse(localStorage.getItem('info-perfil'))
}

if (verificarSiYaEstaRegistrado){
    rellenarCamposDeUsuarioLogueado();
}

function rellenarCamposDeUsuarioLogueado(){
    let usuario = miBD.find(usuario => usuario.email === localStorage.getItem('email'));
    nombre.value = usuario.nombre;
    segundoNombre.value = usuario.segundoNombre;
    apellido.value = usuario.apellido;
    segundoApellido.value = usuario.segundoApellido;
    email.value = usuario.email;
    tel.value = usuario.tel;
}

function validarCampos(input){
    return input.checkValidity()
}

function darFeedback(input,divFeedback,texto){
    if (input.checkValidity()){
        input.classList.remove('is-invalid')
        input.classList.add('is-valid');
        divFeedback.innerHTML ="";
    }
    else{
        input.classList.add('is-invalid')
        divFeedback.innerHTML =texto;
    }
}

function meterFeedback(){
    darFeedback(nombre, document.getElementsByClassName('invalid-feedback')[0], 'Debe ingresar un nombre.')
    darFeedback(apellido, document.getElementsByClassName('invalid-feedback')[1], 'Debe ingresar un apellido.')
    darFeedback(email, document.getElementsByClassName('invalid-feedback')[2], 'Debe ingresar un email.')
}


function cambiarDatosDeUsuario(){
    let usuario = miBD.find(usuario => usuario.email === localStorage.getItem('email'));
    usuario.nombre = nombre.value;
    usuario.segundoNombre = segundoNombre.value;
    usuario.apellido = apellido.value; 
    usuario.segundoApellido = segundoApellido.value; 
    usuario.email = email.value;
    usuario.tel = tel.value;
    localStorage.setItem('info-perfil', JSON.stringify(miBD))
}


function verificarSiYaEstaRegistrado(){
    return miBD.some(usuario=> usuario.email === localStorage.getItem('email'))
}


