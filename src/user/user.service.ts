import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { User } from "./schemas/user.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateUserDto, SignInDto } from "./dto/user.dto";
import { compare, genSalt, hash } from 'bcryptjs';
import { JwtService } from "@nestjs/jwt";


@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private model: Model<User>,
        private jwtService: JwtService
    ) { }

    async create(createAlbumDto: CreateUserDto): Promise<User> {
        createAlbumDto.Password = await hash(createAlbumDto.Password, await genSalt());
        const createdAlbum = new this.model(createAlbumDto);
        return createdAlbum.save();
    }

    async signIn(login: SignInDto): Promise<{ access_token: string }> {
        const user = await this.model.findOne({ Email: login.Email });
        if (!user) {
            throw new NotFoundException();
        }
        const password = await compare(login.Password, user.Password)
        if (!password) {
            throw new UnauthorizedException();
        }
        const payload = { sub: user._id, email: user.Email };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }

    async findAll(): Promise<User[]> {
        return this.model.find().exec();
    }

    async findOne(id: string) {
        return this.model.findById(id);
    }

    async getProfile(email: string): Promise<User> {
        return this.model.findOne({ Email: email }).exec();
    }

    async update(id: string, data: User) {
        return this.model.findByIdAndUpdate(id, data, { new: true });
    }

    async delete(id: string) {
        return this.model.findByIdAndDelete(id);
    }
}