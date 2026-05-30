import { ConflictException, Injectable } from '@nestjs/common';
import { LoginDto } from 'src/auth/dto/loginUser.dto';
import { RegisterDto } from 'src/auth/dto/registerUser.dto';
import { ErrorCodes } from 'src/common/constants/error-codes';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {

    constructor( private readonly prisma: PrismaService){}

    async createUser(registerUserDto: RegisterDto){

        console.log(registerUserDto)

        let result
        try {
            
            // Storing user data in the database using Prisma ORM:
            const user = await this.prisma.user.create({
                data: {
                    firstName: registerUserDto.firstName,
                    lastName: registerUserDto.lastName,
                    email: registerUserDto.email,
                    password: registerUserDto.password,
                },
            })
            result = user
        } catch (error) {
            console.log(error)

            const err = error as { code?: string}

            if(err && err.code === ErrorCodes.PRISMA_UNIQUE_CONSTRAINT.code){
                throw new ConflictException(ErrorCodes.PRISMA_UNIQUE_CONSTRAINT.label)
            }

            throw err
        }

        return {message: "User created successfully", data: result}
    }

    async findUser(loginUserDto: LoginDto){

        try {
            
            const existUser = await this.prisma.user.findUnique({
                where: {
                    email: loginUserDto.email
                }
            })

            if(existUser){
                return existUser
            }

            return null
        } catch (error) {
            
        }
    }
}
