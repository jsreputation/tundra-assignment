import { Repository } from "typeorm";

import { CustomRepository } from "src/database/typeorm-ex.decorator";
import { User } from "./user.entity";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";
import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import * as bcrypt from 'bcrypt';

@CustomRepository(User)
export class UsersRepository extends Repository<User> {
    async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        const { email, password, role } = authCredentialsDto;

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = this.create({ email, password: hashedPassword, role });
        try {
            await this.save(user);
        } catch(err) {
            if (err.code === '23505') {
                throw new ConflictException('Email Address already exists');
            } else {
                throw new InternalServerErrorException();
            }
        }
    }   
}