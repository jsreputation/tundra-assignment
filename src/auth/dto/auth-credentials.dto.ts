import { IsEmail, IsEnum, IsString, Matches, MaxLength, MinLength } from "class-validator";
import { Role } from "../enum/userRole.enum";

export class AuthCredentialsDto {
    @IsEmail()
    email: string;

    @IsString()
    @MinLength(6)
    @MaxLength(40) 
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { 
        message: 'Your password is not strong enough'
    })
    password: string;

    @IsEnum(Role)
    role: Role
}