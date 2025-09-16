import { UsersService } from '@/users/users.service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RegisterUserDto } from './dto/register-user.dto';
import { User } from '@/users/entities/user.entity';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
      ) {}
    
      async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.usersService.findByEmail(username);

        if (user && this.usersService.comparePassword(pass,user.password)) {
          const { password, ...result } = user;
          return result;
        }
        return null;
      }
    
      async login(user: User) {
        const payload = { email: user.email, sub: user.id,role:user.role };
        return {
          user:payload,
          access_token: this.jwtService.sign(payload),
        };
      }

      async register(registerUserDto:RegisterUserDto){
        const user= await this.usersService.register(registerUserDto);
        const { password, ...result } = user;
        return result;
      }
}
