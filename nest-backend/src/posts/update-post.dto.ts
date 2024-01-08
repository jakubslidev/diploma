import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdatePostDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  readonly title?: string;

  @IsString()
  @IsOptional()
  readonly content?: string;

  @IsString()
  @IsOptional()
  readonly thumbnailBig?: string; 

  @IsString()
  @IsOptional()
  readonly thumbnailSmall: string;
}