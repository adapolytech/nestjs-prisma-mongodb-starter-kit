import { Field, ID, ObjectType, createUnionType } from "@nestjs/graphql";
import { EmailExistError } from "src/common/dto/type";

@ObjectType()
export class UsersMutations {}

@ObjectType()
export class User {
  @Field(() => ID)
  id: string;
  @Field()
  firstname: string;
  @Field()
  lastname: string;
  @Field()
  accountId: string;
  @Field()
  createdAt: Date;
}

export const RegisterResponse = createUnionType({
  name: "RegisterResponse",
  types: () => [EmailExistError, User] as const,
  resolveType(value) {
    if (value.code) {
      return EmailExistError;
    }
    return User;
  }
});

export type RegisterResponse = typeof RegisterResponse;
