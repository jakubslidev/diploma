import { WebpagesService } from '../webpages/webpages.service';
export declare class WebpageValidationService {
    private readonly webpagesService;
    constructor(webpagesService: WebpagesService);
    validateWebpageId(webpageId: string, userId: string): Promise<void>;
}
