import { pool } from '../../config/databases/postgresDb';
import {VideoAggregate} from "../../domain/VideoAggregate";
import {VideoMetadata} from "../../domain/entity/VideoMetadata";
import {VideoRepositoryPort} from "../../domain/port/output/VideoRepositoryPort";
import {VideoId} from "../../domain/valueObject/VideoId";
import {VideoQuality} from "../../domain/entity/VideoQuality";
import {logger} from "../../config/logger";
import {IOTraceLogger} from "../../util/IOTraceLogger";


export class PostgresVideoRepository implements VideoRepositoryPort {
    public async getVideoInfo(videoId: VideoId): Promise<VideoAggregate<VideoId> | undefined> {
        const ioTraceLogger = new IOTraceLogger()

        const queryParameters = [videoId.get()]
        const query = `SELECT 
                                    v.id AS video_id,
                                    v.title,
                                    v.uploaded_at,
                                    vs.video_size,
                                    vs.quality,
                                    vs.format
                                FROM videos v
                                INNER JOIN video_quality vs ON v.id = vs.video_id
                                WHERE v.id = $1;`

        try {
            const result = await pool.query(query, queryParameters);

            ioTraceLogger.stop()
            ioTraceLogger.logSql("getVideoInfo",query, queryParameters, "success")

            if(result.rows.length === 0) {
                return undefined
            }

            const metadata = new VideoMetadata(result.rows[0].title)
            const sizes: VideoQuality[] = result.rows.map(r => {
                return new VideoQuality(r.quality, r.video_size, r.format)
            })

            return VideoAggregate.create<VideoId>(videoId, metadata, sizes);
        } catch (err) {
            ioTraceLogger.stop()
            ioTraceLogger.logSql("getVideoInfo",query, queryParameters, "failed")
            console.error('Error executing query', err);
            throw err;
        }
    }
}