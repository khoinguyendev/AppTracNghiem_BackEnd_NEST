import { IsIn, IsOptional, IsString } from 'class-validator';

export class QuestionQueryDto {
  @IsOptional()
  @IsString()
  search?: string; // tìm theo content hoặc description

  @IsOptional()
  @IsString()
  @IsIn(['orderIndex', 'createdAt', 'updatedAt', 'content'])
  order: string = 'createdAt'; // field để sắp xếp

  @IsOptional()
  @IsIn(['ASC', 'DESC', 'asc', 'desc'])
  direction: 'ASC' | 'DESC' | 'asc' | 'desc' = 'DESC'; // chiều sắp xếp
}
