import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { Album } from "src/album/schemas/album.schema";
import { CreateAlbumDto } from "./dto/album.dto";
import { User } from "src/user/schemas/user.schema";
import { AlbumPromise } from "./schemas/album.promise";
import { Photo } from "src/photo/schemas/photo.schema";
import { PhotoService } from "src/photo/photo.service";
import { HelperConfig } from "src/util/helper";

@Injectable()
export class AlbumService {
    constructor(
        @InjectModel(Album.name) private model: Model<Album>,
        @InjectModel(Photo.name) private photoModel: Model<Photo>,
        @InjectModel(User.name) private userModel: Model<User>,

    ) { }

    async create(createAlbumDto: CreateAlbumDto): Promise<Album> {

        const user = await this.userModel.findById(createAlbumDto.userId);
        if (!user) {
            throw new NotFoundException('User not found');
        }

        createAlbumDto.userId = new Types.ObjectId(createAlbumDto.userId)
        createAlbumDto.TanggalDibuat = HelperConfig.onGetDateTimeNow()
        const createdAlbum = new this.model(createAlbumDto);
        return createdAlbum.save();
    }

    async findThree(idAlbum: Types.ObjectId): Promise<Photo[]> {
        return this.photoModel.find({ albumId: idAlbum }).limit(3).exec();
    }

    async findAll(): Promise<AlbumPromise[]> {
        const albums = await this.model.find().exec();
        const albumPromises: AlbumPromise[] = [];

        for (const album of albums) {

            const photos = await this.findThree(album._id)

            const albumPromise: AlbumPromise = {
                _id: album._id,
                NamaAlbum: album.NamaAlbum,
                Deskripsi: album.Deskripsi,
                TanggalDibuat: album.TanggalDibuat,
                userId: album.userId,
                photo: photos
            };

            albumPromises.push(albumPromise);
        }

        return albumPromises;
    }

    async findOne(id: string) {
        return this.model.findById(id);
    }
    async update(id: string, data: Album) {
        return this.model.findByIdAndUpdate(id, data, { new: true });
    }

    async delete(id: string) {
        return this.model.findByIdAndDelete(id);
    }

    async findByUserId(userId: string): Promise<Album[]> {
        const convertedUserId = new Types.ObjectId(userId);
        const albums = await this.model.find({ userId: convertedUserId }).exec();

        const albumPromises: AlbumPromise[] = [];

        for (const album of albums) {

            const photos = await this.findThree(album._id)

            const albumPromise: AlbumPromise = {
                _id: album._id,
                NamaAlbum: album.NamaAlbum,
                Deskripsi: album.Deskripsi,
                TanggalDibuat: album.TanggalDibuat,
                userId: album.userId,
                photo: photos
            };

            albumPromises.push(albumPromise);
        }

        return albumPromises;
    }

}

