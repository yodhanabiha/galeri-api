import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";
import { Album } from "src/album/schemas/album.schema";
import { User } from "src/user/schemas/user.schema";

export type photoDocument = HydratedDocument<Photo>;

@Schema()
export class Photo {
    @Prop({ required: true })
    JudulFoto: string;

    @Prop({ required: true })
    DeskripsiFoto: string;

    @Prop({ required: true })
    LokasiFile: string;

    @Prop({ required: true })
    TanggalUnggah: string;

    @Prop({ type: Types.ObjectId, ref: 'Album' })
    albumId: Album;

    @Prop({ type: Types.ObjectId, ref: 'User' })
    userId: User;
}

export const PhotoSchema = SchemaFactory.createForClass(Photo);