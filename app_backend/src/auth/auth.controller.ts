import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/registerUser.dto';
import { LoginDto } from './dto/loginUser.dto';

@Controller('auth') // All routes in this controller will be prefixed with '/auth'
export class AuthController {

    // Getting authService instance through dependency injection:
    constructor(private readonly authService: AuthService){}

    @Post('register') // This route will be '/auth/register'
    async register(@Body() registerUserDto: RegisterDto){
        const functionResponse = await this.authService.registerUser(registerUserDto);

        if(functionResponse){
            return {message: `User registered successfully`, token: functionResponse}
        }
        return {message: "User registration failed"}
    }

    @Post('login')
    async login(@Body() loginUserDto: LoginDto){

        const functionResponse = await this.authService.loginUser(loginUserDto)
        if(functionResponse){
            return {message: `User loggin successfully`, token: functionResponse}
        }

        return {message: `User loggin failed`}
    }
}
