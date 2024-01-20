import { Field, Int, InterfaceType, ObjectType } from "@nestjs/graphql";

@InterfaceType({ isAbstract: true })
export abstract class GqlError {
  @Field(() => Int)
  code: number;
  @Field(() => String)
  message: string;
}

@ObjectType({ implements: () => [GqlError] })
export class EmailExistError extends GqlError {
  code: number;
  message: string;
}

@ObjectType({ implements: () => [GqlError] })
export class NotFoundError extends GqlError {
  code: number;
  message: string;
}
