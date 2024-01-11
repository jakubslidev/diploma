import { ReportService } from './report.service';
import { Report } from './report.interface';
export declare class ReportController {
    private readonly reportService;
    constructor(reportService: ReportService);
    create(reportData: Report): Promise<Report>;
    findAll(): Promise<Report[]>;
    findByCommentId(commentId: string): Promise<Report[]>;
}
