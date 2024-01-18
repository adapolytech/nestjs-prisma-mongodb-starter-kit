import { Field, Int, InterfaceType, ObjectType } from "@nestjs/graphql";

@InterfaceType({ isAbstract: true })
export abstract class GqlError {
  @Field(() => Int)
  code: number;
  @Field(() => String)
  message: string;
}

@ObjectType({ implements: () => [GqlError] })
export class GqlConflictException extends GqlError {
  code: number;
  message: string;
}

@ObjectType({ implements: () => [GqlError] })
export class GqlNotFoundException extends GqlError {
  code: number;
  message: string;
}
