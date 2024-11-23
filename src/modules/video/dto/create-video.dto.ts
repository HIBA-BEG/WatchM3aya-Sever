import { IsNotEmpty, IsString, IsNumber, IsDate, isDate, IsOptional } from 'class-validator';

export class CreateVideoDto {
  @IsOptional()
  @IsString()
  video: string;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  poster: string;

  @IsOptional()
  @IsString()
  director?: string;

  @IsOptional()
  @IsNumber()
  duration: number;

  @IsOptional()
  @IsDate()
  releaseDate: Date;
}