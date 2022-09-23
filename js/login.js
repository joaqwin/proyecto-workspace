let micontraseña = document.getElementById('contraseña');
let miEmail = document.getElementById('email');
let miButton= document.getElementById('boton_submit');

miButton.addEventListener('click', function(e){
    e.preventDefault();
    let contra = micontraseña.value.length;
    let email = miEmail.value.length;
    if (email > 0 && contra > 0){
        e.preventDefault
        localStorage.setItem('email', miEmail.value);
        window.location.href = 'menu.html';
    }else{
        e.preventDefault();
        alert("Los campos no pueden estar vacios")
           document.getElementById('email').style.borderColor="red";
           document.getElementById('contraseña').style.borderColor="red";
            
    }

})
