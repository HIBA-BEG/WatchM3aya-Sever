import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Video } from './entities/video.entity';
import { CreateVideoDto } from './dto/create-video.dto';
import { MinioService } from '../minio/minio.service';

@Injectable()
export class VideoService {
  constructor(
    @InjectModel(Video.name) private videoModel: Model<Video>,
    private minioService: MinioService,
  ) {}

  async create(
    createVideoDto: CreateVideoDto, 
    videoFile: Buffer,
    posterFile?: Buffer
  ): Promise<Video> {

    const videoPath = await this.minioService.uploadVideo(
      videoFile,
      `${createVideoDto.title}-${Date.now()}.mp4`
    );
    
    let posterPath = '';
    if (posterFile) {
      posterPath = await this.minioService.uploadPoster(
        posterFile,
        `${createVideoDto.title}-poster-${Date.now()}.jpg`
      );
    }

    const createdVideo = new this.videoModel({
      ...createVideoDto,
      video: videoPath,
      poster: posterPath || createVideoDto.poster,
    });

    return createdVideo.save();
  }


  async findAll(): Promise<Video[]> {
    return this.videoModel.find().exec();
  }

  async findOne(id: string): Promise<Video> {
    return this.videoModel.findById(id).exec();
  }
}