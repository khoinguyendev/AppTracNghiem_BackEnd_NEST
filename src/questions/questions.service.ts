import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { Question } from '@/entities/question.entity';
import { IsNull, Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Answer } from '@/entities/answer.entity';
import { ExamsService } from '@/exams/exams.service';
import { QuestionQueryDto } from '@/utils/query.dto';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(Question)
    private questionsRepository: Repository<Question>,
    private readonly examsService:ExamsService,

  ) { }
  async create(createQuestionDto: CreateQuestionDto) {
    const { content, examId, type, description, parent, answers ,orderIndex} = createQuestionDto;
  // kiểm tra exam tồn tại
  const exam = await this.examsService.findOne(examId);
  if (!exam) {
    throw new BadRequestException(`Không tìm thấy đề với id ${examId}`);
  }
    return this.questionsRepository.manager.transaction(async (manager) => {
      // Tạo question
      const question = manager.create(Question, {
        content,
        exam: { id: examId },
        type,
        orderIndex,
        description,
        parent: parent ? { id: parent } : null,
      });
  
      const savedQuestion = await manager.save(question);
  
      // Nếu có answers thì tạo kèm
      if (answers?.length) {
        const arrayAnswers = answers.map((a) =>
          manager.create(Answer, {
            question: { id: savedQuestion.id },
            content: a.content,
            matchKey: a.matchKey,
            isCorrect: a.isCorrect,
          }),
        );
        await manager.save(arrayAnswers);
        savedQuestion.answers = arrayAnswers;
      }
      return savedQuestion;
    });
  }
  

  async findAll() {
    return this.questionsRepository.find({
      relations: ['children'],
      loadRelationIds: {
        relations: ['parent'],
      },
    });
  }

  async findByExam(examId: number, query: QuestionQueryDto) {
    const { order, direction, search } = query;
  
    const where: any = {
      exam: { id: examId },
      parent: IsNull(),
    };
  
    if (search) {
      // tìm theo content hoặc description
      where.content = Like(`%${search}%`);
      // nếu muốn OR với description thì phải dùng QueryBuilder thay vì find()
    }
  
    return this.questionsRepository.find({
      where,
      relations: ['children', 'children.answers', 'answers'],
      loadRelationIds: {
        relations: ['parent'],
      },
      order: { [order]: (direction as 'ASC' | 'DESC') ?? 'ASC' },
    });
  }
  async findOne(id: number) {
    return await this.questionsRepository.findOneBy({ id });

  }

 
  async update(id: number, updateQuestionDto: UpdateQuestionDto) {
    const question = await this.findOne(id);
    if (!question) {
      throw new BadRequestException(`Không tìm thấy câu hỏi có id là ${id}.`);
    }
  
    // chuyển parentId (number) thành object { id }
    const { parent, ...rest } = updateQuestionDto;
    const updatedQuestion = this.questionsRepository.merge(question, {
      ...rest,
      parent: parent ? { id: parent } : null,
    });
  
    return await this.questionsRepository.save(updatedQuestion);
  }
  
  async remove(id: number) {
    const exam = await this.findOne(id)
    if (!exam) {
      throw new BadRequestException(`Không tìm thấy câu hỏi có id là ${id}.`)
    }
    return await this.questionsRepository.delete(id);
  }
}
