import { Injectable } from '@nestjs/common';
import { CreateExamDto } from './dto/create-exam.dto';
import { UpdateExamDto } from './dto/update-exam.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Exam } from '@/entities/exam.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ExamsService {
  constructor(
    @InjectRepository(Exam)
    private examsRepository: Repository<Exam>,
  ) { }
  async create(createExamDto: CreateExamDto) {
    const {title,description}=createExamDto;
    const exam=this.examsRepository.create({
      title,
      description
    })
    return await this.examsRepository.save(exam);
  }

  findAll() {
    return `This action returns all exams`;
  }

  findOne(id: number) {
    return `This action returns a #${id} exam`;
  }

  update(id: number, updateExamDto: UpdateExamDto) {
    return `This action updates a #${id} exam`;
  }

  remove(id: number) {
    return `This action removes a #${id} exam`;
  }
}
