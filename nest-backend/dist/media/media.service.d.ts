/// <reference types="multer" />
export declare class MediaService {
    private readonly uploadPath;
    resizeAndSaveImage(file: Express.Multer.File): Promise<string>;
    saveImageFile(file: any): string;
}
