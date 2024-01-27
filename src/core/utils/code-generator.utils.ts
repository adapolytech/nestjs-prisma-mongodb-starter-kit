import * as randomatic from "randomatic";

export const digitsCodeGenerator = (len: number = 5) => {
  return randomatic("0", len, { exclude: "0" });
};
