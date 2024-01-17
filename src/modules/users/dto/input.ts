import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class Credentials {
  @Field()
  email: string;
  @Field()
  password: string;
}

@InputType()
export class RegisterInput {
  @Field()
  firstname: string;
  @Field()
  lastname: string;
  @Field()
  email: string;
  @Field()
  password: string;
}
