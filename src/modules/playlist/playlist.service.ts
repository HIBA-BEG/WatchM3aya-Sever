import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { Playlist } from './entities/playlist.entity';

@Injectable()
export class PlaylistService {
  constructor(
    @InjectModel(Playlist.name) private playlistModel: Model<Playlist>
  ) {}

  async create(createPlaylistDto: CreatePlaylistDto): Promise<Playlist> {
    const createdPlaylist = new this.playlistModel(createPlaylistDto);
    return createdPlaylist.save();
  }

  async findAll(): Promise<Playlist[]> {
    return this.playlistModel.find()
      .populate('userId')
      .populate('videoIds')
      .exec();
  }

  async findOne(id: string): Promise<Playlist> {
    const playlist = await this.playlistModel.findById(id)
      .populate('userId')
      .populate('videoIds')
      .exec();
    
    if (!playlist) {
      throw new NotFoundException(`Playlist with ID ${id} not found`);
    }
    return playlist;
  }

  async update(id: string, updatePlaylistDto: UpdatePlaylistDto): Promise<Playlist> {
    const updatedPlaylist = await this.playlistModel
      .findByIdAndUpdate(id, updatePlaylistDto, { new: true })
      .populate('userId')
      .populate('videoIds')
      .exec();
    
    if (!updatedPlaylist) {
      throw new NotFoundException(`Playlist with ID ${id} not found`);
    }
    return updatedPlaylist;
  }

  async remove(id: string): Promise<void> {
    const result = await this.playlistModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Playlist with ID ${id} not found`);
    }
  }
}