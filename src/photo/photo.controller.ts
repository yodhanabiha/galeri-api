import { Body, Controller, FileTypeValidator, Get, MaxFileSizeValidator, Param, ParseFilePipe, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { CreatePhotoDto, photoSchema } from "./dto/photo.dto";
import { PhotoService } from "./photo.service";
import { Photo } from "./schemas/photo.schema";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { ApiBody, ApiConsumes, ApiTags } from "@nestjs/swagger";
import { CacheInterceptor, CacheTTL } from "@nestjs/cache-manager";

const storage = diskStorage({
    destination: './storage',
    filename: (req, file, cb) => {
        const name = file.originalname.split('.')[0];
        const randomName = `file-${Date.now()}-${file.originalname}`;
        cb(null, `${name}-${randomName}`);
    },
});

@ApiTags('Photo')
@Controller('photo')
export class PhotoController {

    constructor(
        private readonly photoService: PhotoService,
    ) { }

    @Post()
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(FileInterceptor('photo', { storage }))
    @ApiBody(photoSchema)
    async create(
        @Body() body: CreatePhotoDto,
        @UploadedFile(
            new ParseFilePipe({
                validators: [
                    new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 1024 }),
                    new FileTypeValidator({ fileType: 'image/*' }),
                ]
            })
        )
        photo: Express.Multer.File,
    ): Promise<any> {
        return await this.photoService.create(body, photo)
    }

    @Get()
    @UseInterceptors(CacheInterceptor)
    @CacheTTL(600)
    async getAll(): Promise<Photo[]> {
        return this.photoService.findAll();
    }

    @Get(':albumId')
    async getPhotoByAlbum(@Param('albumId') albumId: string): Promise<Photo[]> {
        return this.photoService.findByAlbumId(albumId);
    }

}