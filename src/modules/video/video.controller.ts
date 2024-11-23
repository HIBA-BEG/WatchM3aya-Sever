import { Controller, Get, Post, Param, Req, UseInterceptors, UploadedFiles, BadRequestException, Body, Res } from '@nestjs/common';
import { VideoService } from './video.service';
import { FastifyReply, FastifyRequest } from 'fastify';
import { CreateVideoDto } from './dto/create-video.dto';
import { MultipartFields, MultipartFile } from '@fastify/multipart';

@Controller('video')
export class VideoController {
  constructor(private readonly videoService: VideoService) { }

  @Post()
  async create(@Req() request: FastifyRequest) {
    try {
      const parts = await request.parts();

      let videoFile: Buffer | undefined;
      let posterFile: Buffer | undefined;
      const fields: any = {};

      for await (const part of parts) {
        if (part.type === 'file') {
          if (part.fieldname === 'video') {
            videoFile = await part.toBuffer();
          } else if (part.fieldname === 'poster') {
            posterFile = await part.toBuffer();
          }
        } else {
          fields[part.fieldname] = part.value;
        }
      }

      if (!videoFile) {
        throw new BadRequestException('Video file is required');
      }

      if (!fields.title) {
        throw new BadRequestException('Title is required');
      }

      const createVideoDto: CreateVideoDto = {
        title: fields.title,
        description: fields.description,
        director: fields.director,
        duration: fields.duration,
        releaseDate: fields.releaseDate,
        video: '',
        poster: '',
      };

      return await this.videoService.create(createVideoDto, videoFile, posterFile);
    } catch (error) {
      console.error('Upload error:', error);
      throw new BadRequestException(error.message);
    }
  }

  @Get()
  findAll() {
    return this.videoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.videoService.findOne(id);
  }
}