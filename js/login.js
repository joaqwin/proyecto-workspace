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

var user_token;
var datos_google = [];
function handleCredentialResponse(response) {
    console.log("Encoded JWT ID token: " + response.credential);
    user_token = response.credential;
    datos_google = jwt_decode(user_token)
    if (datos_google !== []){
        localStorage.setItem('email', datos_google.email);
        window.location.href = 'menu.html';
    } 
    }
window.onload = function () {
    google.accounts.id.initialize({
    client_id: "344842469123-c9ekgvucrhbodukr6h86boac9eb0q3df.apps.googleusercontent.com",
    callback: handleCredentialResponse
        });
        google.accounts.id.renderButton(
        document.getElementById("buttonDiv"),
        { theme: "outline", size: "large" }  // customization attributes
        );
        google.accounts.id.prompt(); // also display the One Tap dialog
    }
