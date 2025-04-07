import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateFaqInput } from 'src/database/dto/create-faq.input';
import { cleanText, generateSnippetNumber } from 'src/utils/string-helpers';
import { Like, Repository } from 'typeorm';
import { UpdateFaqInput } from './dto/update-faq.input';
import { Faq } from './entites/faq.entity';

@Injectable()
export class DatabaseService {
  constructor(@InjectRepository(Faq) private faqRepo: Repository<Faq>) {}

  findAll() {
    return this.faqRepo.find({ order: { createdAt: 'DESC' } });
  }

  findOne(id: number) {
    return this.faqRepo.findOneBy({ id });
  }
  async create(data: CreateFaqInput) {
    const existingFaq = await this.search(data.question);

    if (existingFaq.length > 0) {
      throw new ConflictException('An FAQ with this question already exists.');
    }

    const cleanQuestion = cleanText(data.question);
    const snippet = generateSnippetNumber(cleanQuestion);

    const faq = this.faqRepo.create({
      ...data,
      question: cleanQuestion,
      questionSnippet: snippet,
    });
    return this.faqRepo.save(faq);
  }

  update(data: UpdateFaqInput) {
    if (!data.question || !data.answer) {
      throw new Error('Question & Answer are required');
    }
    const cleanQuestion = cleanText(data.question);
    const snippet = generateSnippetNumber(cleanQuestion);
    return this.faqRepo.save({
      ...data,
      question: cleanQuestion,
      questionSnippet: snippet,
    });
  }

  remove(id: number) {
    return this.faqRepo.delete(id);
  }

  search(question: string) {
    if (!question || question.length < 10) {
      throw new Error(
        'Question is required and should be more than 10 characters',
      );
    }
    const cleanQuestion = cleanText(question);
    const snippet = generateSnippetNumber(cleanQuestion);
    return this.faqRepo.find({
      where: {
        questionSnippet: snippet,
        question: Like(`%${cleanQuestion}%`),
      },
    });
  }
}
