import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { Answer } from '@/entities/answer.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Question } from '@/entities/question.entity';
import { AnswerDto } from '@/questions/dto/create-question.dto';

@Injectable()
export class AnswersService {
  constructor(
    @InjectRepository(Answer)
    private answersRepository: Repository<Answer>,
  ) { }
  async create(createAnswerDto: CreateAnswerDto) {
    const { content, matchKey, questionId, isCorrect } = createAnswerDto;
    const answer = this.answersRepository.create({
      question: {
        id: questionId
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

  async findOne(id: number) {
    return await this.answersRepository.findOneBy({ id });
  }

  async update(id: number, updateAnswerDto: UpdateAnswerDto) {
    const answer = await this.findOne(id);
    if (!answer) {
      throw new BadRequestException(`Không tìm thấy câu trả lời có id là ${id}.`);
    }
  }
  async replaceByQuestionId(
    questionId: number,
    newAnswersDto: AnswerDto[],
  ) {
    return await this.answersRepository.manager.transaction(
      async (transactionalEntityManager) => {
        // Kiểm tra xem question có tồn tại không
        const questionExists = await transactionalEntityManager.findOne(Question, {
          where: { id: questionId },
        });

        if (!questionExists) {
          throw new BadRequestException(
            `Không tìm thấy câu hỏi với id = ${questionId}.`,
          );
        }

        // Xóa toàn bộ câu trả lời cũ của question
        await transactionalEntityManager.delete(Answer, {
          question: { id: questionId },
        });

        // Tạo mới toàn bộ câu trả lời
        const newAnswers = newAnswersDto.map((dto) =>
          transactionalEntityManager.create(Answer, {
            ...dto,
            question: { id: questionId },
          }),
        );

        return await transactionalEntityManager.save(Answer, newAnswers);
      },
    );
  }

  remove(id: number) {
    return `This action removes a #${id} answer`;
  }
}
