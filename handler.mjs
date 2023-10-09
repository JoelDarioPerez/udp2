import AL900 from "./protocols.mjs";
export const handler = () => {
  if (Buffer.byteLength(data) === 99 || Buffer.byteLength(data) === 97)
    return AL900(data);
  else return "Invalid Protocol";
};
