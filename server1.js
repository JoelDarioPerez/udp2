const net = require('net');
import handler from './handler.mjs'


// Función para procesar los datos


const server = net.createServer((socket) => {
  console.log('Cliente conectado');

  // Establece la conexión con el servidor remoto
  const remoteServer = net.connect(3000, 'www.sinotracking.com.ar', () => {
    console.log('Conexión con el servidor remoto establecida');

    // Redirige los datos del cliente al servidor remoto después de procesarlos
    socket.on('data', (data) => {
      const datosProcesados = handler(data);
      remoteServer.write(datosProcesados);
    });

    // Redirige los datos del servidor remoto al cliente
    remoteServer.pipe(socket);

    // Maneja eventos de cierre de conexión
    socket.on('end', () => {
      console.log('Cliente desconectado');
    });

    remoteServer.on('end', () => {
      console.log('Conexión con el servidor remoto cerrada');
    });
  });

  // Maneja eventos de error
  socket.on('error', (err) => {
    console.error('Error en la conexión con el cliente:', err);
  });

  remoteServer.on('error', (err) => {
    console.error('Error en la conexión con el servidor remoto:', err);
  });
});

const PORT = 12345; // Cambia el puerto según tus necesidades
server.listen(PORT, () => {
  console.log(`Servidor TCP/IP escuchando en el puerto ${PORT}`);
});
