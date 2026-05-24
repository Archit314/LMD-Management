import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/registerUser.dto';

@Controller('auth') // All routes in this controller will be prefixed with '/auth'
export class AuthController {

    // Getting authService instance through dependency injection:
    constructor(private readonly authService: AuthService){}

    @Post('register') // This route will be '/auth/register'
    register(@Body() registerUserDto: RegisterDto){
        const result = this.authService.registerUser(registerUserDto);
        if(result){
            return result
        }
        return {message: "User registration failed"}
    }
}
