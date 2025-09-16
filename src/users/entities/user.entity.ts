import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export enum UserRole {
    ADMIN = "admin",
    USER = "user",
    EDITOR = "editor",
}

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    email: string;

    @Column({
        type: "enum",
        enum: UserRole,
        default: UserRole.USER,
    })
    role: UserRole
    @Column()
    name: string;
    @Column()
    password: string;
    
    @CreateDateColumn()
    createdAt: Date;
    @UpdateDateColumn()
    updatedAt?: Date;

}
