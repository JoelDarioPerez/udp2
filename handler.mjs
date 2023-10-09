import { AL900 } from "./protocols.mjs";
export const handler = (data) => {
  if (Buffer.byteLength(data) > 1)
    return AL900(data);
  else return "Invalid Protocol";
};
