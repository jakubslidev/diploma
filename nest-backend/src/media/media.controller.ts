//media.controller.ts
import { Controller, Post, UseInterceptors, UploadedFile, Res } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MediaService } from './media.service';
import { Response } from 'express';
import { multerOptions } from './multer.config';


@Controller('media')
export class MediaController {
  constructor(private mediaService: MediaService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('image', multerOptions))
  async uploadFile(@UploadedFile() file: Express.Multer.File, @Res() res: Response) {
    if (!file) {
      return res.status(400).send('No file uploaded.');
    }

    try {
      const imagePath = await this.mediaService.resizeAndSaveImage(file);

      // Send back the URL or path of the stored (and resized) image
      res.status(201).json({ path: imagePath });
    } catch (error) {
      console.error('Failed to resize image:', error);
      res.status(500).send('Failed to process image.');
    }
  }


  @Post('upload-thumbnail')
  @UseInterceptors(FileInterceptor('thumbnail', multerOptions))
  async uploadThumbnail(@UploadedFile() file: Express.Multer.File, @Res() res: Response) {
    if (!file) {
      return res.status(400).send('No file uploaded.');
    }

    try {
      const { bigPath, smallPath } = await this.mediaService.resizeAndSaveThumbnail(file);
      console.log(bigPath, smallPath);

      // Send back the URLs or paths of the stored thumbnails
      res.status(201).json({ bigPath, smallPath });
    } catch (error) {
      console.error('Failed to resize thumbnail:', error);
      res.status(500).send('Failed to process thumbnail.');
    }
  }
}
