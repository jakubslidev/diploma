import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { extname } from 'path';
import { join } from 'path';
import * as jimp from 'jimp';

@Injectable()
export class MediaService {
  private readonly uploadPath = 'uploads'; 

  async resizeAndSaveImage(file: Express.Multer.File): Promise<string> {
    const imagePath = join(this.uploadPath, file.filename);

    const image = await jimp.read(file.path);
    await image
      .resize(800, 600, jimp.RESIZE_BEZIER) 
      .quality(80) 
      .writeAsync(imagePath);

    return imagePath; 
  }
  
  saveImageFile(file): string {
    
    const fileExtName = extname(file.originalname);
    const randomName = uuidv4(); 
    const fullPath = `${this.uploadPath}/${randomName}${fileExtName}`;

    return fullPath;
  }
}
