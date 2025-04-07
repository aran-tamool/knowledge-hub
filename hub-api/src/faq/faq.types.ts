// src/faq/faq.type.ts
import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class FaqType {
  @Field(() => Int)
  id: number;

  @Field()
  question: string;

  @Field()
  answer: string;

  // @Field(() => Int)
  // questionSnippet: number;

  // @Field()
  // createdAt: Date;

  // @Field()
  // updatedAt: Date;
}

@ObjectType()
export class DeleteFaqResponse {
  @Field()
  success: boolean;

  @Field()
  message: string;
}
