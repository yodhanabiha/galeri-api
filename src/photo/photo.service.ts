import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Photo } from "./schemas/photo.schema";
import { Model, Types } from "mongoose";
import { User } from "src/user/schemas/user.schema";
import { Album } from "src/album/schemas/album.schema";
import { CreatePhotoDto, PhotoDto } from "./dto/photo.dto";
import { HelperConfig } from "src/util/helper";

@Injectable()
export class PhotoService {
    constructor(

        @InjectModel(Photo.name) private model: Model<Photo>,
        @InjectModel(User.name) private userModel: Model<User>,
        @InjectModel(Album.name) private albumModel: Model<Album>

    ) { }

    async create(createPhotoDto: CreatePhotoDto, file: Express.Multer.File): Promise<Photo> {


        const user = await this.userModel.findById(createPhotoDto.userId);
        if (!user) {
            throw new NotFoundException('User not found');
        }

        const album = await this.albumModel.findById(createPhotoDto.albumId);
        if (!album) {
            throw new NotFoundException('Album not found');
        }

        createPhotoDto.userId = new Types.ObjectId(createPhotoDto.userId)
        createPhotoDto.albumId = new Types.ObjectId(createPhotoDto.albumId)
        const created: PhotoDto = {
            albumId: createPhotoDto.albumId,
            userId: createPhotoDto.userId,
            DeskripsiFoto: createPhotoDto.DeskripsiFoto,
            JudulFoto: createPhotoDto.JudulFoto,
            LokasiFile: `/${file.filename}`,
            TanggalDibuat: HelperConfig.onGetDateTimeNow(),
            TanggalUnggah: HelperConfig.onGetDateTimeNow()
        }

        return new this.model(created).save()
    }

    async findAll(): Promise<Photo[]> {
        return this.model.find().exec();
    }

    async findOne(id: string) {
        return this.model.findById(id);
    }

    async update(id: string, data: Photo) {
        return this.model.findByIdAndUpdate(id, data, { new: true });
    }

    async delete(id: string) {
        return this.model.findByIdAndDelete(id);
    }

    async findByAlbumId(albumId: string): Promise<Photo[]> {
        const convertedId = new Types.ObjectId(albumId);
        return this.model.find({ albumId: convertedId }).exec();
    }

}

