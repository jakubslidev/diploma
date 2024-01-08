//media.service.ts
import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { extname } from 'path';
import { join } from 'path';
import * as jimp from 'jimp';

@Injectable()
export class MediaService {
  private readonly uploadPath = 'uploads'; 

  async resizeAndSaveThumbnail(file: Express.Multer.File): Promise<{ bigPath: string, smallPath: string }> {
    const filename = uuidv4() + extname(file.originalname);
    const bigPath = join(this.uploadPath, 'big_' + filename);
    const smallPath = join(this.uploadPath, 'small_' + filename);

    const image = await jimp.read(file.path);
    
    // Save big thumbnail
    await image
      .resize(598, 312) // Resize to width 598 and auto height to maintain aspect ratio
      .writeAsync(bigPath);
    
    // Save small thumbnail
    await image
      .resize(398, 312) // Resize to width 398 and auto height to maintain aspect ratio
      .writeAsync(smallPath);

      return {
        bigPath: `${this.uploadPath}/big_${filename}`,
        smallPath: `${this.uploadPath}/small_${filename}`
      };
  }

  async resizeAndSaveImage(file) {
    const imagePath = `${this.uploadPath}/${file.filename}`;
  
    const image = await jimp.read(file.path);
  
    // Check if the image is larger than 800x600
    if (image.bitmap.width > 800 || image.bitmap.height > 600) {
      // If it is, resize it
      await image
        .resize(800, jimp.AUTO) // Resize the width to 800 and scale the height accordingly
        .quality(80); // Set the image quality to 80%
      await image.writeAsync(imagePath); // Save the image
    } else {
      // If it's not larger, just copy the image to the destination without resizing
      const originalImage = await jimp.read(file.path);
      await originalImage.writeAsync(imagePath);
    }
  
    return imagePath;
  }


  
  saveImageFile(file): string {
    
    const fileExtName = extname(file.originalname);
    const randomName = uuidv4(); 
    const fullPath = `${this.uploadPath}/${randomName}${fileExtName}`;

    return fullPath;
  }


}
