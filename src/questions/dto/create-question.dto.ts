import { Position } from "@/entities/answer.entity";
import { Type } from "class-transformer";
import { IsArray, IsBoolean, IsEnum, IsInt, IsNotEmpty, IsOptional, ValidateNested } from "class-validator";

export class CreateQuestionDto {
    @IsNotEmpty()
    @IsInt()
    examId: number;

    @IsOptional()
    @IsInt()
    parent?: number|null;
    @IsOptional()
    @IsInt()
    orderIndex?: number|null;
    @IsNotEmpty()
    content: string;

    @IsNotEmpty()
    type: string;
    @IsOptional()
    description?: string;
    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true }) 
    @Type(() => AnswerDto)
    answers: AnswerDto[];
}


export class AnswerDto {
   
    @IsNotEmpty()
    content: string;
    @IsOptional()
    @IsBoolean()
    isCorrect?: boolean;
    @IsOptional()
    matchKey?: string;
    @IsOptional()
    @IsEnum(Position)
    position?:Position
}