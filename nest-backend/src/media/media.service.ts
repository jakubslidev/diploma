import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { extname } from 'path';
import { join } from 'path';
import * as jimp from 'jimp';

@Injectable()
export class MediaService {
  private readonly uploadPath = 'uploads'; // Make sure this directory exists

  async resizeAndSaveImage(file: Express.Multer.File): Promise<string> {
    const imagePath = join(this.uploadPath, file.filename);

    const image = await jimp.read(file.path);
    await image
      .resize(800, 600, jimp.RESIZE_BEZIER) // Resize the image to 800x600, maintaining aspect ratio
      .quality(80) // Optional: Adjust the quality for smaller file sizes
      .writeAsync(imagePath); // Save the resized image

    return imagePath; // Return the path to the resized image
  }


  // This function could be called by the MediaController
  saveImageFile(file): string {
    // Generate a random filename
    const fileExtName = extname(file.originalname);
    const randomName = uuidv4(); // Generates a unique identifier
    const fullPath = `${this.uploadPath}/${randomName}${fileExtName}`;

    // Here you would save the file to the disk, database, or cloud storage
    // For now, we're just returning the path for illustration purposes

    return fullPath;
  }
}
