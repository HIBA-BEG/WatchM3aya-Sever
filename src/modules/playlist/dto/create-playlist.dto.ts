import { IsString, IsArray, IsOptional } from 'class-validator';
import { Types } from 'mongoose';

export class CreatePlaylistDto {
  @IsString()
  name: string;

  @IsString()
  userId: Types.ObjectId;

  @IsArray()
  @IsOptional()
  videoIds?: Types.ObjectId[];
}