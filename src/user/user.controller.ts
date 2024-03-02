import { Body, Controller, Get, Param, Post, Request, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto, SignInDto } from "./dto/user.dto";
import { ApiBearerAuth, ApiHeader, ApiTags } from "@nestjs/swagger";
import { User } from "./schemas/user.schema";
import { Public } from "./user.constant";
import { AuthGuard } from "./user.guard";

@ApiTags('User')
@ApiBearerAuth()
@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService) { }

    @Public()
    @Post("/login")
    async signIn(@Body() login: SignInDto): Promise<{ access_token: string; }> {
        return this.userService.signIn(login)
    }

    @Public()
    @Post("/register")
    async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
        return this.userService.create(createUserDto);
    }

    @Get()
    async getUsers(): Promise<User[]> {
        return this.userService.findAll();
    }

    @UseGuards(AuthGuard)
    @Get("/profile")
    async getProfile(@Request() req): Promise<User> {
        const user = req.user;
        return await this.userService.getProfile(user.email);
    }
}