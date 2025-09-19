import { BadRequestException, Injectable } from '@nestjs/common';
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
    const { title, description } = createExamDto;
    const exam = this.examsRepository.create({
      title,
      description
    })
    return await this.examsRepository.save(exam);
  }

  async findAll() {
    return await this.examsRepository.find();
  }

  async findOne(id: number) {
    return this.examsRepository.findOneBy({ id });
  }

  async update(id: number, updateExamDto: UpdateExamDto) {
    const exam = await this.findOne(id)
    if (!exam) {
      throw new BadRequestException(`Không tìm thấy đề có id là ${id}.`)
    }
    const updatedExam = this.examsRepository.merge(exam, updateExamDto);
    return await this.examsRepository.save(updatedExam);
  }

  async remove(id: number) {
    const exam = await this.findOne(id)
    if (!exam) {
      throw new BadRequestException(`Không tìm thấy đề có id là ${id}.`)
    }
    return await this.examsRepository.delete(id);
  }
}
