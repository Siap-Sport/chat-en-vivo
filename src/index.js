//servidor
const http = require( 'http' )
const path = require( 'path' )
const express = require( 'express' );
const socketio = require( 'socket.io' );

const app = express();
const server =  http.createServer( app )
const io = socketio.listen(server)
const mongoose = require('mongoose')

//DB conecction
mongoose.connect('mongodb://localhost/chat-database')  //El nombre chat-databse es como se llamara nuestra base de datos pero aun no existe pero mognodb la va a crear y le podra ese nombre
    .then(db => console.log('DB connected'))
    .catch( err => console.log(err));

//Settings
app.set( 'port' , process.env.PORT || 3000 )

const servidor = require('./sockets') //Esto viene de /.scokets
const servidorDos = require('./socketsDos')
servidor.ioFnc(io);  //LE envio como parametro 'io' a el archivo sockets
servidorDos.ioFnc(io);//Le envio como paramtero 'io' a el archivo socketsDos 
// require( './sockets' )( io )

// Enviando archivos estaticos

app.use(express.static(path.join(__dirname , 'public'))) ;

// Escuchando el srvidor
server.listen( app.get( 'port' ) , () => {
    console.log('Server in port ' , app.get('port'));
} )