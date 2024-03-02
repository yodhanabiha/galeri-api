import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Types } from 'mongoose';
import { User } from 'src/user/schemas/user.schema';

export type albumDocument = HydratedDocument<Album>;

@Schema()
export class Album {

    @Prop({ required: true })
    NamaAlbum: string;

    @Prop({ required: true })
    Deskripsi: string;

    @Prop({ required: true })
    TanggalDibuat: string;

    @Prop({ type: mongoose.Types.ObjectId, ref: 'User' })
    userId: User;

}

export const AlbumSchema = SchemaFactory.createForClass(Album);