import { User } from '../../user/entities/user.entity';
import { Video } from '../../video/entities/video.entity';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Playlist extends Document {
    @Prop()
    name: string;

    @Prop({ type: Types.ObjectId, ref: 'User' })
    userId: Types.ObjectId;

    @Prop({ type: [{ type: Types.ObjectId, ref: 'Video' }] })
    videoIds: Types.ObjectId[];
}

export const PlaylistSchema = SchemaFactory.createForClass(Playlist);