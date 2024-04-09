import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';
import { LoginCredentialsDto } from './dto/login-credentials.dto';
@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UsersRepository)
        private usersRepository: UsersRepository,
        private jwtService: JwtService
    ) {}

    async register(authCredentialsDto: AuthCredentialsDto) : Promise<void> {
        return this.usersRepository.createUser(authCredentialsDto)
    }

    async logIn(loginCredentialsDto: LoginCredentialsDto): Promise<{accessToken: string}> {
        const { email, password } = loginCredentialsDto;
        const user = await this.usersRepository.findOne({
            where: {
                email: email
            }
        });

        if (user && (await bcrypt.compare(password, user.password))) {
            const payload: JwtPayload = { email };
            const accessToken = await this.jwtService.sign(payload);
            return { accessToken }
        } else {
            throw new UnauthorizedException('You credentials are incorrect');
        }
    }
}
