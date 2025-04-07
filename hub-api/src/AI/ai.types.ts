
import { Field, InputType, ObjectType } from '@nestjs/graphql';

@ObjectType()
@InputType('AIMessageInput')
export class AIMessage {
  @Field(() => String)
  role: 'system' | 'user' | 'assistant';

  @Field(() => String)
  content: string;

  @Field(() => String, { nullable: true })
  name?: string;
}

@ObjectType()
export class AskAIResponse {
  @Field()
  answer: string;
}
