import { IsEmail, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class LoginCredentialsDto {
    @IsEmail()
    email: string;

    @IsString()
    @MinLength(6)
    @MaxLength(40) 
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { 
        message: 'Password should contain big case, small case letter and symbols'
    })
    password: string;
}