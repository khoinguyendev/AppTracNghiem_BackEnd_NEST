import { IsBoolean, IsInt, IsNotEmpty, IsOptional } from "class-validator";

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
