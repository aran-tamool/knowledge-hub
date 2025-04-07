import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { CreateFaqInput } from '../database/dto/create-faq.input';
import { UpdateFaqInput } from '../database/dto/update-faq.input';

@Injectable()
export class FaqService {
  constructor(private readonly databaseService: DatabaseService) {}

  findAll() {
    return this.databaseService.findAll();
  }

  findOne(id: number) {
    return this.databaseService.findOne(id);
  }

  create(data: CreateFaqInput) {
    return this.databaseService.create(data);
  }

  update(data: UpdateFaqInput) {
    return this.databaseService.update(data);
  }

  remove(id: number) {
    return this.databaseService.remove(id);
  }

  search(question: string) {
    return this.databaseService.search(question);
  }
}
