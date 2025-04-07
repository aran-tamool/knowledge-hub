
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AiResolver } from './ai.resolver';
import { AiService } from './ai.service';

@Module({
  imports: [ConfigModule],
  providers: [AiService, AiResolver],
  exports: [AiService],
})
export class AiModule {}
