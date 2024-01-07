import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdatePostDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  readonly title?: string;

  @IsString()
  @IsOptional()
  readonly content?: string;

  // Include other properties that can be updated
}