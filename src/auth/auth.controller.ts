import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { Public } from './decorator/public.decorator';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }
    @Public()
    @Post('register')
    async login(@Body() registerUserDto:RegisterUserDto) {
        return this.authService.register(registerUserDto);
    }
}
