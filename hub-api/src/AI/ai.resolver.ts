// ai.resolver.ts

import { Args, Query, Resolver } from '@nestjs/graphql';
import { AiService } from './ai.service';
import { AskAIResponse } from './ai.types';

@Resolver()
export class AiResolver {
  constructor(private readonly aiService: AiService) {}

  @Query(() => AskAIResponse)
  async askAI(
    @Args('question', { type: () => String }) question: string,
  ): Promise<AskAIResponse> {
    return this.aiService.askQuestion(question);
  }
}
