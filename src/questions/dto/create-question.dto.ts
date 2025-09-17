import { IsInt, IsNotEmpty, IsOptional } from "class-validator";

export class CreateQuestionDto {
    @IsNotEmpty()
    @IsInt()
    examId:number;

    @IsOptional()
    @IsInt()
    parent?:number;

    @IsNotEmpty()
    content:string;

    @IsNotEmpty()
    type:string;
    @IsOptional()
    description?:string;

}
