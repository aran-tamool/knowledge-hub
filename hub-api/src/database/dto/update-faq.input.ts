import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { CreateFaqInput } from './create-faq.input';

@InputType()
export class UpdateFaqInput extends PartialType(CreateFaqInput) {
  @Field(() => Int)
  id: number;
}
