import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseService } from './database.service';
import { Faq } from './entites/faq.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT) || 3306,
      username: process.env.DB_USER || 'root',
      password: process.env.DB_PASS || 'root',
      database: process.env.DB_NAME || 'hub',
      autoLoadEntities: true,
      synchronize: process.env.NODE_ENV !== 'production', // use false in production
    }),
    TypeOrmModule.forFeature([Faq]),
  ],
  exports: [DatabaseService],
  providers: [DatabaseService],
})
export class DatabaseModule {}
