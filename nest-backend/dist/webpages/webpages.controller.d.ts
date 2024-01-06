import { WebpagesService } from './webpages.service';
import { Webpage } from './webpages.schema';
import { WebpageValidationService } from '../authz/webpage-validation.service';
export declare class WebpagesController {
    private readonly webpagesService;
    private readonly webpageValidationService;
    constructor(webpagesService: WebpagesService, webpageValidationService: WebpageValidationService);
    create(webpage: Webpage): Promise<Webpage>;
    findAll(): Promise<Webpage[]>;
    findById(id: string): Promise<Webpage>;
    getUserWebpages(req: any): Promise<any[]>;
    getUserRole(webpageId: string, req: any): Promise<{
        role: string;
    }>;
    findAllUsersForWebpage(webpageId: string): Promise<any[]>;
}
