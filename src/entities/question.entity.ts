import { 
    Column, 
    CreateDateColumn, 
    Entity, 
    ManyToOne, 
    OneToMany, 
    PrimaryGeneratedColumn, 
    UpdateDateColumn 
  } from 'typeorm';
  import { Exam } from '@/entities/exam.entity';
import { Answer } from '@/entities/answer.entity';
  
  @Entity('questions')
  export class Question {
    @PrimaryGeneratedColumn()
    id: number;
  
    @ManyToOne(() => Exam, (exam) => exam.questions, { onDelete: 'CASCADE' })
    exam: Exam;
  
    @ManyToOne(() => Question, (question) => question.children, { nullable: true, onDelete: 'CASCADE' })
    parent: Question;
  
    @OneToMany(() => Question, (question) => question.parent)
    children: Question[];
  
    @Column({ type: 'text' })
    content: string;
    @Column({ type: 'text' })
    description: string;
    @Column({ length: 50 })
    type: string; // multiple_choice, fill_blank, multi_answer, matching
  
    @Column({nullable: true})
    orderIndex: number;
  
    @OneToMany(() => Answer, (answer) => answer.question)
    answers: Answer[];
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  }
  