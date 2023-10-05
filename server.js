var raw = require("raw-socket");

var socket = raw.createSocket({
  protocol: raw.Protocol.UDP, // Indicamos que queremos trabajar con UDP
  addressFamily: raw.AddressFamily.IPv4, // Indicamos IPv4
});

socket.on("message", function (buffer, source) {
  console.log(
    "Recibido " +
      buffer.length +
      " bytes desde " +
      source.address + // La dirección IP del remitente
      ":" +
      source.port + // El puerto del remitente
      "\n" +
      buffer.toString("utf8") // El contenido del paquete UDP (asumiendo que es texto)
  );
});

socket.bind({
  address: "0.0.0.0", // Escucha en todas las interfaces de red
  port: 12345, // El puerto en el que escucharás los paquetes UDP
});

console.log("Servidor UDP escuchando en el puerto 12345...");
