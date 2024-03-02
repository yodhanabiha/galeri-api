import { Photo } from "src/photo/schemas/photo.schema";
import { User } from "src/user/schemas/user.schema";

export interface AlbumPromise {
    NamaAlbum: string;
    Deskripsi: string;
    TanggalDibuat: string;
    userId: User;
    photo: Photo[];
}