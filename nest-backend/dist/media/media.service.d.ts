/// <reference types="multer" />
export declare class MediaService {
    private readonly uploadPath;
    resizeAndSaveThumbnail(file: Express.Multer.File): Promise<{
        bigPath: string;
        smallPath: string;
    }>;
    resizeAndSaveImage(file: any): Promise<string>;
    saveImageFile(file: any): string;
}
