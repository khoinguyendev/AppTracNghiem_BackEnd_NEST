import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { RegisterUserDto } from '@/auth/dto/register-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import bcrypt from "bcrypt";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) { }

  async register(registerUserDto: RegisterUserDto) {
    const { email, password } = registerUserDto;
    const existUser = await this.findByEmail(email);
    if (existUser) {
      throw new ConflictException("Email đã tồn tại.")
    };
    const hashPassword=this.hashPassword(password);
    const user = this.usersRepository.create({
      email,
      password:hashPassword,
      name: email
    })
    return this.usersRepository.save(user);
  }
  async findByEmail(email: string) {
    const user = await this.usersRepository.findOneBy({
      email
    })
    return user;
  }
  create(registerUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }


  findAll() {
    return `This action returns all users`;
  }



  // async findOne(username: string): Promise<User | undefined> {
  //   return this.users.find(user => user.username === username);
  // }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  hashPassword(password: string) {
    return bcrypt.hashSync(password, 10);
  }
  comparePassword(plaintextPassword:string,hash:string){
    return bcrypt.compareSync(plaintextPassword, hash); 
  }

}
