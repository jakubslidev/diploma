/// <reference types="multer" />
import { MediaService } from './media.service';
import { Response } from 'express';
export declare class MediaController {
    private mediaService;
    constructor(mediaService: MediaService);
    uploadFile(file: Express.Multer.File, res: Response): Promise<Response<any, Record<string, any>>>;
    uploadThumbnail(file: Express.Multer.File, res: Response): Promise<Response<any, Record<string, any>>>;
}
