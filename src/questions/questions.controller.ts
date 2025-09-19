import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { Public } from '@/auth/decorator/public.decorator';
import { QuestionQueryDto } from '@/utils/query.dto';

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
  findByExam(@Param('examId',ParseIntPipe) examId: number,  @Query() query: QuestionQueryDto,
) {
    return this.questionsService.findByExam(examId,query);
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.questionsService.findOne(+id);
  }

 
  @Public()
  @Patch(':id')
  update(@Param('id',ParseIntPipe) id: number, @Body() updateQuestionDto: UpdateQuestionDto) {
    return this.questionsService.update(id, updateQuestionDto);
  }

  @Public()
  @Delete(':id')
  remove(@Param('id',ParseIntPipe) id: number) {
    return this.questionsService.remove(id);
  }
}
