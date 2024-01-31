import * as randomatic from "randomatic";

export const digitsCodeGenerator = (length: number = 5) => {
  return randomatic("0", length, { exclude: "0" });
};

export const generateToken = (length: number = 50) => {
  return randomatic("Aa0", length);
};