import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { AlbumService } from "src/album/album.service";
import { CreateAlbumDto } from "./dto/album.dto";
import { Album } from "./schemas/album.schema";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('Album')
@Controller('album')
export class AlbumController {

    constructor(
        private readonly albumService: AlbumService,
    ) { }

    @Post()
    async createAlbum(@Body() createAlbumDto: CreateAlbumDto): Promise<any> {
        const created = this.albumService.create(createAlbumDto);
        return created
    }

    @Get()
    async getAlbum(): Promise<Album[]> {
        return this.albumService.findAll();
    }

    @Get(':userId')
    async getAlbumsByUser(@Param('userId') userId: string): Promise<Album[]> {
        return this.albumService.findByUserId(userId);
    }

}