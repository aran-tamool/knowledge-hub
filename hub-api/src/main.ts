import { NestFactory } from '@nestjs/core';
import { json } from 'body-parser';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(json());

  app.enableCors({
    // origin: 'http://localhost:3000', // Your frontend URL
    credentials: true, // If you need to send cookies or authorization headers
    // methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Add all methods you use
    // allowedHeaders: ['Content-Type', 'Authorization'], // Add all headers you use
  });

  await app.listen(process.env.PORT ?? 4000);

  console.log(`Application is running on: ${await app.getUrl()}`);
  console.log(`Environment: ${process.env.NODE_ENV}`);
  console.log(`graphql endpoint is at: ${await app.getUrl()}/graphql`);
}
// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();
