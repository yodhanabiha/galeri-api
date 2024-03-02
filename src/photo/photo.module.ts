import { MongooseModule } from "@nestjs/mongoose";
import { Photo, PhotoSchema } from "./schemas/photo.schema";
import { User, UserSchema } from "src/user/schemas/user.schema";
import { Album, AlbumSchema } from "src/album/schemas/album.schema";
import { PhotoController } from "./photo.controller";
import { PhotoService } from "./photo.service";
import { Module } from "@nestjs/common";
import { CacheModule } from "@nestjs/cache-manager";

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Photo.name, schema: PhotoSchema },
            { name: User.name, schema: UserSchema },
            { name: Album.name, schema: AlbumSchema }
        ]),
        CacheModule.register({
            ttl: 60,
        })
    ],
    controllers: [PhotoController],
    providers: [PhotoService],
})
export class PhotoModule { }