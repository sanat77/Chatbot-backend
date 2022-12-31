import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

// schemas
import { Message, MessageSchema } from './message/message.schema';

// services
import { AppService } from './app.service';
import { MessageService } from './message/message.service';

// controllers
import { AppController } from './app.controller';
import { MessageController } from './message/message.controller';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    MongooseModule.forFeature([
      { name: Message.name, schema: MessageSchema }
    ])
  ],
  controllers: [
    AppController,
    MessageController
  ],
  providers: [
    AppService,
    MessageService
  ],
})
export class AppModule {}
