import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AlbumModule } from './album/album.module';
import { UserModule } from './user/user.module';
import { PhotoModule } from './photo/photo.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/galeri'),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'storage'),
    }),
    AlbumModule,
    UserModule,
    PhotoModule,
    ConfigModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
