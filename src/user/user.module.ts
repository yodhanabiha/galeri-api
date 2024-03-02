import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "./schemas/user.schema";
import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule } from "@nestjs/config";
import { AuthGuard } from "./user.guard";
import { APP_GUARD } from "@nestjs/core";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        ConfigModule.forRoot(),
        JwtModule.register({
            global: true,
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: '60000000s' },
        }),

    ],
    controllers: [UserController],
    providers: [
        UserService,
    ],
})
export class UserModule { }