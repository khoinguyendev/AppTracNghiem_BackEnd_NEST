import {  AnswerDto } from "@/questions/dto/create-question.dto";
import { Type } from "class-transformer";
import { IsArray, IsBoolean, IsInt, IsNotEmpty, IsOptional, ValidateNested } from "class-validator";

export class CreateAnswerDto {
    @IsNotEmpty()
    @IsInt()
    questionId: number;

    @IsNotEmpty()
    content: string;
    @IsOptional()
    @IsBoolean()
    isCorrect?: boolean;
    @IsOptional()
    matchKey?: string;
}

export class ReplaceAnswersDto {
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => AnswerDto)
    answers: AnswerDto[];
  }