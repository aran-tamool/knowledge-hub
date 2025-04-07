import { Module } from '@nestjs/common';

import { DatabaseModule } from 'src/database/database.module';
import { FaqResolver } from './faq.resolver';
import { FaqService } from './faq.service';

@Module({
  imports: [DatabaseModule],
  providers: [FaqService, FaqResolver],
})
export class FaqModule {}
