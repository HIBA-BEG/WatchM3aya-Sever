import { PartialType } from '@nestjs/mapped-types';
import { CreatePlaylistDto } from './create-playlist.dto';
import { IsArray, IsOptional } from 'class-validator';
import { IsNotEmpty } from 'class-validator';
import { IsString } from 'class-validator';
import { Types } from 'mongoose';

export class UpdatePlaylistDto extends PartialType(CreatePlaylistDto) {
    @IsString()
    @IsOptional()
    @IsNotEmpty()
    name: string;

    @IsArray()
    @IsOptional()
    @IsNotEmpty()
    videoIds: Types.ObjectId[];
}
