import { Injectable } from '@nestjs/common';
import { Client } from 'minio';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MinioService {
  private minioClient: Client;
  private readonly videoBucket = 'videos';
  private readonly posterBucket = 'posters';

  constructor(private configService: ConfigService) {
    this.minioClient = new Client({
      endPoint: configService.get('MINIO_ENDPOINT'),
      port: parseInt(configService.get('MINIO_PORT')),
      useSSL: configService.get('MINIO_USE_SSL') === 'true',
      accessKey: configService.get('MINIO_ACCESS_KEY'),
      secretKey: configService.get('MINIO_SECRET_KEY'),
    });

    this.initializeBuckets();
  }

  private async initializeBuckets() {
    const buckets = [this.videoBucket, this.posterBucket];
    for (const bucket of buckets) {
      const exists = await this.minioClient.bucketExists(bucket);
      if (!exists) {
        await this.minioClient.makeBucket(bucket);
      }
    }
  }

  async uploadVideo(file: Buffer, filename: string): Promise<string> {
    const objectName = `${Date.now()}-${filename}`;
    await this.minioClient.putObject(
      this.videoBucket,
      objectName,
      file,
    );
    return `${this.videoBucket}/${objectName}`;
  }

  async uploadPoster(file: Buffer, filename: string): Promise<string> {
    const objectName = `${Date.now()}-${filename}`;
    await this.minioClient.putObject(
      this.posterBucket,
      objectName,
      file,
    );
    return `${this.posterBucket}/${objectName}`;
  }
}