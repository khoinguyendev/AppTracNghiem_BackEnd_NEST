import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Put } from '@nestjs/common';
import { AnswersService } from './answers.service';
import { CreateAnswerDto, ReplaceAnswersDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { Public } from '@/auth/decorator/public.decorator';

@Controller('answers')
export class AnswersController {
  constructor(private readonly answersService: AnswersService) { }

  @Public()
  @Post()
  create(@Body() createAnswerDto: CreateAnswerDto) {
    return this.answersService.create(createAnswerDto);
  }

  @Get()
  findAll() {
    return this.answersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.answersService.findOne(+id);
  }
  @Public()
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateAnswerDto: UpdateAnswerDto) {
    return this.answersService.update(id, updateAnswerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.answersService.remove(+id);
  }

  @Public()
  @Put('question-id/:id/replace')
  async replaceByQuestionId(@Param('id', ParseIntPipe) id: number, @Body() dto: ReplaceAnswersDto,
  ) {
    return this.answersService.replaceByQuestionId(id, dto.answers);
  }
}
