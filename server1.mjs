import net from "net";
import dgram from "dgram";
import { handler } from "./handler.mjs";
import { AL900 } from "./protocols.mjs";

const UDP_SERVER_IP = "200.89.128.108";
const UDP_SERVER_PORT = "6002";
const SINOTRACKINGIP = "45.112.204.101";
const SINOTRACKINGPORT = "7000";
const server = net.createServer((socket) => {
  console.log("Cliente conectado");

  // Establece la conexión con el servidor remoto
  const remoteServer = net.connect(SINOTRACKINGPORT, SINOTRACKINGIP, () => {
    console.log("Conexión con el servidor remoto establecida");

    // Redirige los datos del cliente al servidor remoto después de procesarlos
    socket.on("data", (data) => {
      console.log("Datos recibidos del cliente:", data.toString("hex"));
    
      try {
        const datosProcesados = handler(data.toString("hex"));
        console.log("Datos procesados:", datosProcesados);
    
        remoteServer.write(datosProcesados);
    
        // Envía los datos procesados a la IP y puerto UDP
        enviarDatosUDP(datosProcesados);
      } catch (error) {
        console.error("Error al procesar los datos:", error);
      }
    });
    

    // Redirige los datos del servidor remoto al cliente
    remoteServer.pipe(socket);

    // Maneja eventos de cierre de conexión
    socket.on("end", () => {
      console.log("Cliente desconectado");
    });

    remoteServer.on("end", () => {
      console.log("Conexión con el servidor remoto cerrada");
    });
  });

  // Maneja eventos de error
  socket.on("error", (err) => {
    console.error("Error en la conexión con el cliente:", err);
  });

  remoteServer.on("error", (err) => {
    console.error("Error en la conexión con el servidor remoto:", err);
  });
});

const enviarDatosUDP = (data) => {
  const udpClient = dgram.createSocket("udp4");
  const buffer = Buffer.from(data);

  udpClient.send(
    buffer,
    0,
    buffer.length,
    UDP_SERVER_PORT,
    UDP_SERVER_IP,
    (err) => {
      if (err) {
        console.error("Error al enviar datos UDP:", err);
      } else {
        console.log("Datos enviados por UDP con éxito");
      }

      udpClient.close();
    }
  );
};

const PORT = 3200; // Cambia el puerto según tus necesidades
server.listen(PORT, () => {
  console.log(`Servidor TCP/IP escuchando en el puerto ${PORT}`);
});
