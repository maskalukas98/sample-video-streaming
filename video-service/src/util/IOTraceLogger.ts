import {logger} from "../config/logger";

export class IOTraceLogger {
    public static readonly shouldLog = true

    private startTime = Date.now()
    private executionTime: number | undefined

    public start(): void {
        this.startTime = Date.now()
    }

    public stop(): void {
        const endTime = Date.now();
        this.executionTime = endTime - this.startTime;
    }

    public logSql(message: string, query: string, parameters: any[], status: "success" | "failed"): void {
        if(!IOTraceLogger.shouldLog || !this.executionTime) {
            return
        }

        logger.info({
            message,
            status,
            type: "sql",
            query: query,
            parameters,
            executionTime: `${this.executionTime}ms`,
        });
    }
}