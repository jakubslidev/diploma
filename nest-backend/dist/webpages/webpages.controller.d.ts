import { WebpagesService } from './webpages.service';
import { Webpage } from './webpages.schema';
export declare class WebpagesController {
    private readonly webpagesService;
    constructor(webpagesService: WebpagesService);
    create(webpage: Webpage): Promise<Webpage>;
    findAll(): Promise<Webpage[]>;
    findById(id: string): Promise<Webpage>;
    getUserWebpages(req: any): Promise<Webpage[]>;
}
