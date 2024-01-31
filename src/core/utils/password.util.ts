import { compare, hash } from "bcrypt";

export class PasswordUtils {
  private static readonly SALT: number = 10;

  static hash(plainTextPassword: string) {
    return hash(plainTextPassword, this.SALT);
  }

  static compare(plainTextPassword: string, hashString: string) {
    return compare(plainTextPassword, hashString);
  }
}
