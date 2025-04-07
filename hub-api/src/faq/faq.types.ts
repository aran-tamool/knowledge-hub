
import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class FaqType {
  @Field(() => Int)
  id: number;

  @Field()
  question: string;

  @Field()
  answer: string;


}

@ObjectType()
export class DeleteFaqResponse {
  @Field()
  success: boolean;

  @Field()
  message: string;
}
