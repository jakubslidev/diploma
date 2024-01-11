import { Model } from 'mongoose';
import { Report } from './report.interface';
export declare class ReportService {
    private readonly reportModel;
    constructor(reportModel: Model<Report>);
    create(reportData: Report): Promise<Report>;
    findAll(): Promise<Report[]>;
    findByCommentId(commentId: string): Promise<Report[]>;
}
