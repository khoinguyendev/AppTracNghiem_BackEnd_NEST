import { IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class CreateExamDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(1)
    @MaxLength(255)
    title:string;

    @IsOptional()
    @IsString()
    @MinLength(1)
    description?:string;
}
