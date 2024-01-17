import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Account {}

@ObjectType()
export class RegisterResponse {
  @Field(() => ID)
  id: string;
  @Field()
  firstname: string;
  @Field()
  lastname: string;
}
