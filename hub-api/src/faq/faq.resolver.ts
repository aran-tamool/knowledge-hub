import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateFaqInput } from '../database/dto/create-faq.input';
import { UpdateFaqInput } from '../database/dto/update-faq.input';

import { FaqService } from './faq.service';
import { DeleteFaqResponse, FaqType } from './faq.types';

@Resolver(() => FaqType)
export class FaqResolver {
  constructor(private readonly faqService: FaqService) {}

  @Query(() => [FaqType])
  getAllFaqs() {
    return this.faqService.findAll();
  }

  @Query(() => FaqType, { nullable: true })
  getFaqById(@Args('id', { type: () => Int }) id: number) {
    return this.faqService.findOne(id);
  }

  @Mutation(() => FaqType)
  createFaq(@Args('input') input: CreateFaqInput) {
    return this.faqService.create(input);
  }

  @Mutation(() => FaqType)
  updateFaq(@Args('input') input: UpdateFaqInput) {
    return this.faqService.update(input);
  }

  @Mutation(() => DeleteFaqResponse)
  async deleteFaq(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<DeleteFaqResponse> {
    try {
      await this.faqService.remove(id);
      return {
        success: true,
        message: 'FAQ deleted successfully',
      };
    } catch (error) {
      console.error('Error deleting FAQ:', error);
      return {
        success: false,
        message: 'Error deleting FAQ',
      };
    }
  }

  @Query(() => [FaqType])
  searchFaqs(@Args('search') search: string) {
    return this.faqService.search(search);
  }
}
