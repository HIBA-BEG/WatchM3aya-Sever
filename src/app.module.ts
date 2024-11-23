import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { VideoModule } from './modules/video/video.module';
import { PlaylistModule } from './modules/playlist/playlist.module';
import { RoomModule } from './modules/room/room.module';
import { InvitationModule } from './modules/invitation/invitation.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    UserModule, 
    VideoModule, 
    PlaylistModule, 
    RoomModule, 
    InvitationModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
