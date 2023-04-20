import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserModel } from './user.model';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { InjectModel } from 'nestjs-typegoose';
import { AuthDto } from './dto/auth.dto';
import { genSalt, hash, compare } from "bcryptjs";
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(
        @InjectModel(UserModel) private readonly userModel: ModelType<UserModel>,
        private readonly jwtService: JwtService
    ) { }

    async createuser(dto: AuthDto) {
        const salt = await genSalt(10);
        const newUser = new this.userModel({
            email: dto.login,
            passwordHash: await hash(dto.password, salt)
        });
        return newUser.save();
    }

    async finduser(email: string) {
        console.log(this.userModel.findOne({ email: email }).exec())
        return this.userModel.findOne({ email: email }).exec();
    }

    async validateUser(email: string, password: string) {
        const user = await this.finduser(email);
        if (!user) {
            throw new UnauthorizedException(USER_NOT_FOUND);
        }
        const isCorrectPassword = await compare(password, user.passwordHash);
        if (!isCorrectPassword) {
            throw new UnauthorizedException(INVALID_PASSWORD);
        }
        return { email: user.email };
    }

    async login(email: string) {
        const payload = { email };
        return {
            accessToken: await this.jwtService.signAsync(payload)
        };
    }

}
