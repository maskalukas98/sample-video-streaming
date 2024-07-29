import {VideoStatsRepositoryPort} from "../../domain/port/output/VideoStatsRepositoryPort";
import {VideoId} from "../../domain/valueObject/VideoId";
import {cassandraClient} from "../../config/cassandraDb";
import {logger} from "../../config/logger";

export class CassandraVideoStatsRepository implements VideoStatsRepositoryPort {
    public async increaseView(videoId: VideoId): Promise<void> {
        const query = 'UPDATE video_stats SET total_views = total_views + ? WHERE video_id = ?';
        const incrementBy = 1

        try {
            await cassandraClient.execute(query, [incrementBy, videoId.get()], { prepare: true });
        } catch (error) {
            logger.error(`Error incrementing total_views for videoId ${videoId.get()}.`, error)
        }
    }

    public async getTotalViews(videoId: VideoId): Promise<number | undefined> {
        const query = 'SELECT total_views FROM video_stats WHERE video_id = ?';

        try {
            const result = await cassandraClient.execute(query, [videoId.get()], { prepare: true });

            if (result.rowLength > 0) {
                return result.rows[0].total_views;
            } else {
                return undefined;
            }
        } catch (error) {
            logger.error(`Error fetching total_views from cassandra for video ${videoId.get()}.`, error)
            throw error
        }
    }
}