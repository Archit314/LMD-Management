import { Injectable } from '@nestjs/common';
import { RegisterDto } from 'src/auth/dto/registerUser.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {

    constructor( private readonly prisma: PrismaService){}

    async createUser(registerUserDto: RegisterDto){

        // Storing user data in the database using Prisma ORM:
        const user = await this.prisma.user.create({
            firstName: registerUserDto.firstName,
            lastName: registerUserDto.lastname,
            email: registerUserDto.email,
            password: registerUserDto.password
        })
        return {message: "User created successfully", data: user}
    }
}
