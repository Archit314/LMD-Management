import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { RegisterDto } from './dto/registerUser.dto';
import bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ){}

    async registerUser(registerUserDto: RegisterDto){

        console.log(registerUserDto)

        const hash = await bcrypt.hash(registerUserDto.password, 10)

        const createdUser = await this.userService.createUser({...registerUserDto, password: hash})

        const token = await this.jwtService.signAsync({ sub: createdUser.data.id, email: createdUser.data.email})

        console.log(token)

        console.log(createdUser)

        return token
    }
}
