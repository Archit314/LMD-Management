import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { RegisterDto } from './dto/registerUser.dto';
import bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/loginUser.dto';

@Injectable()
export class AuthService {

    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ){}

    async generateToken(id: string, email: string){

        return await this.jwtService.signAsync({ sub: id, email: email})
    }

    async registerUser(registerUserDto: RegisterDto){

        console.log(registerUserDto)

        const hash = await bcrypt.hash(registerUserDto.password, 10)

        const createdUser = await this.userService.createUser({...registerUserDto, password: hash})

        const token = await this.generateToken(createdUser.data.id, createdUser.data.email)

        console.log(token)

        console.log(createdUser)

        return token
    }

    async loginUser(loginUserDto: LoginDto){

        const gotUser = await this.userService.findUser(loginUserDto)
        if(gotUser){
            
            const isMatch = await bcrypt.compare(loginUserDto.password, gotUser.password)
            if(isMatch){

                const token = await this.generateToken(String(gotUser.id), gotUser.email)
                return token
            }
        }

        return null
    }
}
