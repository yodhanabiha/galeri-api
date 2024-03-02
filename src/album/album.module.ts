import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Album, AlbumSchema } from 'src/album/schemas/album.schema';
import { AlbumService } from 'src/album/album.service';
import { AlbumController } from './album.controller';
import { User, UserSchema } from 'src/user/schemas/user.schema';
import { Photo, PhotoSchema } from 'src/photo/schemas/photo.schema';
import { PhotoService } from 'src/photo/photo.service';

@Module({
    imports: [MongooseModule.forFeature([
        { name: Album.name, schema: AlbumSchema }, 
        { name: User.name, schema: UserSchema }, 
        { name: Photo.name, schema: PhotoSchema }
    ])],
    controllers: [AlbumController],
    providers: [AlbumService, PhotoService],
})
export class AlbumModule { }