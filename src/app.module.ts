import { Module } from '@nestjs/common';
import { AppController } from '@/app.controller';
import { AppService } from '@/app.service';
import { UsersModule } from '@/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@/entities/user.entity';
import { AuthModule } from '@/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from '@/auth/guard/roles.guard';
import { JwtAuthGuard } from '@/auth/guard/jwt-auth.guard';
import { Exam } from '@/entities/exam.entity';
import { Answer } from '@/entities/answer.entity';
import { Question } from '@/entities/question.entity';
import { ExamsModule } from '@/exams/exams.module';
import { QuestionsModule } from '@/questions/questions.module';
import { AnswersModule } from '@/answers/answers.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UsersModule,
    AuthModule,
    ExamsModule,
    QuestionsModule,
    AnswersModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'test',
      entities: [User,Exam,Answer,Question],
      synchronize: true,
    }),

  ],
  controllers: [AppController],
  providers: [AppService,
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    { provide: APP_GUARD, useClass: RolesGuard },
  ],
})
export class AppModule { }
