import { Controller, Post, Body } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { LoginCredentialsDto } from './dto/login-credentials.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    constructor(
        private authService: AuthService
    ) {}
    
    @Post('/register')
    register(@Body() authCredentialsDto:AuthCredentialsDto): Promise<void> {
        return this.authService.register(authCredentialsDto);
    }

    @Post('/login')
    logIn(@Body() loginCredentialsDto:LoginCredentialsDto): Promise<{accessToken: string}> {
        return this.authService.logIn(loginCredentialsDto);
    }
}
