import { Types } from "mongoose"
import { ApiProperty } from '@nestjs/swagger';

export const photoSchema = {
    schema: {
        type: 'object',
        required: ['JudulFoto', 'DeskripsiFoto', 'albumId', 'userId', 'photo'],
        properties: {
            JudulFoto: { type: 'string' },
            DeskripsiFoto: { type: 'string' },
            albumId: { type: 'string', format: 'ObjectId' },
            userId: { type: 'string', format: 'ObjectId' },
            photo: {
                type: 'string',
                format: 'binary',
            },
        },
    },
}

export class CreatePhotoDto {
    @ApiProperty()
    JudulFoto: string;
    @ApiProperty()
    DeskripsiFoto: string;
    @ApiProperty({ type: String })
    albumId: Types.ObjectId;
    @ApiProperty({ type: String })
    userId: Types.ObjectId;
}

export interface PhotoDto {
    JudulFoto: string
    DeskripsiFoto: string
    TanggalDibuat: string
    LokasiFile: string
    TanggalUnggah: string
    albumId: Types.ObjectId
    userId: Types.ObjectId
}

