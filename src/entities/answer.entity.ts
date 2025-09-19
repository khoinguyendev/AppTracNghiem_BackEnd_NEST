import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { Question } from './question.entity';

export enum Position {
  Right = "right",
  Left = "left",
}

@Entity('answers')
export class Answer {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Question, (question) => question.answers, { onDelete: 'CASCADE' })
  question: Question;

  @Column({ type: 'text', nullable: true })
  content: string;

  @Column({ default: false })
  isCorrect: boolean;

  @Column({ length: 50, nullable: true })
  matchKey: string; // dùng cho câu hỏi matching
  @Column({
    type: "enum",
    enum: Position,
    nullable: true
  })
  position: Position; // dùng cho câu hỏi matching
  @Column({ default: 0 })
  orderIndex: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
