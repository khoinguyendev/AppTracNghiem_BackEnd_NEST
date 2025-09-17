import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { Public } from '@/auth/decorator/public.decorator';

@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Public()
  @Post()
  create(@Body() createQuestionDto: CreateQuestionDto) {
    return this.questionsService.create(createQuestionDto);
  }

  @Public()
  @Get()
  findAll() {
    return this.questionsService.findAll();
  }

  @Public()
  @Get('exams/:examId')
  findByExam(@Param('examId',ParseIntPipe) examId: number) {
    return this.questionsService.findByExam(examId);
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.questionsService.findOne(+id);
  }

 

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateQuestionDto: UpdateQuestionDto) {
    return this.questionsService.update(+id, updateQuestionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.questionsService.remove(+id);
  }
}
