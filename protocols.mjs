export function AL900(data) {
  const paquete = data.toString("hex");
  try {
    const dataAL = data.toString("");
    const patente = "DRKS19";

    const latitud = (dataAL) => {
      const Latgrados = dataAL.substring(31, 33);
      const latMin = dataAL.substring(33, 35);
      const latMindec = dataAL.substring(35, 38) / 1000;
      const resultado = (
        parseFloat(Latgrados) +
        (parseFloat(latMin) + parseFloat(latMindec)) / 60
      ).toFixed(5);
      console.log(resultado);
      return resultado;
    };

    const longitud = (dataAL) => {
      const longG = dataAL.substring(39, 41);
      const longMin = dataAL.substring(41, 43);
      const longMindec = dataAL.substring(43, 46) / 1000;
      const resultado = (
        parseFloat(longG) +
        (parseFloat(longMin) + parseFloat(longMindec)) / 60
      ).toFixed(5);
      return resultado.toString().padStart(9, "0");
    };

    const googleLink = (obj) => {
      const maps = `https://www.google.com/maps/place/-${obj.latitud},-${obj.longitud}`;
      console.log(maps);
      return maps;
    };

    const yy = data.substring(18, 20);
    const mm = data.substring(20, 22);
    const dd = data.substring(22, 24);
    const hh = data.substring(24, 26);
    const mi = data.substring(26, 28);
    const ss = data.substring(28, 30);
    const horaUTC = new Date(Date.UTC(yy, mm - 1, dd, hh, mi, ss));
    horaUTC.setUTCHours(horaUTC.getUTCHours());

    const isValid = (dataAL) => {
      const isValid = dataAL.substring(54, 56);
      if (isValid === "ff") {
        return "A";
      } else if (isValid === "7f") {
        return "V";
      }
      // Agrega más condiciones si es necesario
    };

    const obj = {};
    obj.dia = horaUTC.getDate().toString().padStart(2, "0");
    obj.mes = (horaUTC.getMonth() + 1).toString().padStart(2, "0");
    obj.anio = horaUTC.getFullYear().toString().slice(-2);
    obj.hora = horaUTC.getHours().toString().padStart(2, "0");
    obj.min = horaUTC.getMinutes().toString().padStart(2, "0");
    obj.seg = horaUTC.getSeconds().toString().padStart(2, "0");
    obj.id = dataAL.substring(10, 18);
    obj.latDirection = dataAL.substring(30, 31);
    obj.latitud = latitud(dataAL);
    obj.longDirection = dataAL.substring(40, 41);
    obj.longitud = longitud(dataAL);
    obj.speed = dataAL.substring(47, 50);
    obj.course = dataAL.substring(51, 54);
    obj.gps = isValid(dataAL);
    obj.fuel = dataAL.substring(56, 62);
    obj.state = dataAL.substring(62, 70);
    obj.otherState = dataAL.substring(70, dataAL.length);
    obj.googleLink = googleLink(obj);
    obj.event = "03";

    const resultado = `${patente}-${obj.latitud}-${obj.longitud}${obj.dia}${obj.mes}${obj.anio}${obj.hora}${obj.min}${obj.seg}${obj.speed}${obj.course}${obj.event}${obj.gps}`;
    console.log(obj);
    console.log(resultado);
    return resultado;
  } catch (e) {
    console.error("AL 900", e);
  }
}
