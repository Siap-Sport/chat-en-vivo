
$(function (){

    const socket = io();
    const usuario = document.querySelector('#usuario');
    const pass = document.querySelector('#pass');
    const formLogin = document.querySelector('#formLogin');
    formLogin.addEventListener('submit' , () => {

        usuarioData = {
            usuario : usuario.value,
            pass : pass.value
        }
        
        socket.emit('usuario' ,  usuarioData , results => {
            if ( results ){
                console.log('Bienvenido' , results);
            }else{
                console.log('Usuario o contraseña incorrecta');
            }
        })
        
    })
})
