import { ApiProperty } from "@nestjs/swagger";
import { Types } from "mongoose";


export class CreateAlbumDto {
    @ApiProperty()
    NamaAlbum: string;
    @ApiProperty()
    Deskripsi: string;
    TanggalDibuat: string;
    @ApiProperty({ type: String})
    userId: Types.ObjectId;
}

