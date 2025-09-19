import { Module } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { QuestionsController } from './questions.controller';
import { Question } from '@/entities/question.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnswersModule } from '@/answers/answers.module';
import { ExamsModule } from '@/exams/exams.module';

@Module({
  imports:[TypeOrmModule.forFeature([Question]),AnswersModule,ExamsModule],
  controllers: [QuestionsController],
  providers: [QuestionsService],
})
export class QuestionsModule {}
