import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/registerUser.dto';
import { LoginDto } from './dto/loginUser.dto';
import { AuthGuard } from './auth.guard';
import { UserService } from 'src/user/user.service';

@Controller('auth') // All routes in this controller will be prefixed with '/auth'
export class AuthController {

    // Getting authService instance through dependency injection:
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService
    ){}

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

    @UseGuards(AuthGuard)
    @Get('profile')
    async getProfile(@Request() req){

        const userId = req.user.sub
        if(!userId){
            return {message: "User not found"}
        }

        const gotUser = await this.userService.findUser({id: Number(userId)})
        if(!gotUser){
            return {message: "User not found"}
        }

        // Excluding the password field from the response:
        const {password, ...response} = gotUser

        return {message: "User profile fetched successfully", data: response}
    }
}
