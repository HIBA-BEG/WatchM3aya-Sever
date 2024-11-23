import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  profilePicture: string;

  @Prop({ default: false })
  isBanned: boolean;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Playlist' }] })
  myPlaylist: Types.ObjectId[];
}

export const UserSchema = SchemaFactory.createForClass(User);
