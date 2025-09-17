import { Injectable } from '@nestjs/common';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { Answer } from '@/entities/answer.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AnswersService {
  constructor(
    @InjectRepository(Answer)
    private answersRepository: Repository<Answer>,
  ) { }
  async create(createAnswerDto: CreateAnswerDto) {
    const {content,matchKey,questionId,isCorrect}=createAnswerDto;
    const answer=this.answersRepository.create({
      question:{
        id:questionId
      },
      content,
      matchKey,
      isCorrect
    });
    return await this.answersRepository.save(answer);
  }

  findAll() {
    return `This action returns all answers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} answer`;
  }

  update(id: number, updateAnswerDto: UpdateAnswerDto) {
    return `This action updates a #${id} answer`;
  }

  remove(id: number) {
    return `This action removes a #${id} answer`;
  }
}
