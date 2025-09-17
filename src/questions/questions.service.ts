import { Injectable } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { Question } from '@/entities/question.entity';
import { IsNull, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(Question)
    private questionsRepository: Repository<Question>,
  ) { }
  async create(createQuestionDto: CreateQuestionDto) {
    const { content, examId, type, description, parent } = createQuestionDto;
    const question = this.questionsRepository.create({
      content,
      exam: {
        id: examId
      },
      type,
      description,
      parent: {
        id: parent
      }
    })
    return this.questionsRepository.save(question);
  }

  async findAll() {
    return this.questionsRepository.find({
      relations: ['children'],
      loadRelationIds: {
        relations: ['parent'],
      },
    });
  }

  async findByExam(examId: number) {
    return this.questionsRepository.find({
      where: {
        exam: { id: examId },
        parent: IsNull()
      }, // lọc theo examId
      relations: ['children', 'children.answers', 'answers'], // children trả về full object
      loadRelationIds: {
        relations: ['parent'], // parent chỉ lấy id
      },
      order: { orderIndex: 'ASC' }, // nếu muốn sắp theo thứ tự
    });
  }
  findOne(id: number) {
    return `This action returns a #${id} question`;
  }

  update(id: number, updateQuestionDto: UpdateQuestionDto) {
    return `This action updates a #${id} question`;
  }

  remove(id: number) {
    return `This action removes a #${id} question`;
  }
}
