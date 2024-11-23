import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Video extends Document {
  @Prop({ required: true })
  video: string;

  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop()
  poster : string;

  @Prop()
  director : string;

  @Prop({ required: true })
  duration: number;

  @Prop()
  releaseDate: Date;
}

export const VideoSchema = SchemaFactory.createForClass(Video);