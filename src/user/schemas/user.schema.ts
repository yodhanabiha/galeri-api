import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type userDocument = HydratedDocument<User>;

@Schema()
export class User {

    @Prop({ required: true })
    Username: string;

    @Prop({ required: true })
    Password: string;

    @Prop({ required: true })
    Email: string;

    @Prop({ required: true })
    NamaLengkap: string;

    @Prop({ required: true })
    Alamat: string;
}

export const UserSchema = SchemaFactory.createForClass(User);