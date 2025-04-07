import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateFaqInput {
  @Field()
  question: string;

  @Field()
  answer: string;
}
