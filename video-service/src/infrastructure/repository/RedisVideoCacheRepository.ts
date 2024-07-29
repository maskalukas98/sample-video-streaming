import { VideoCacheRepositoryPort} from "../../domain/port/output/VideoCacheRepositoryPort";
import {VideoId} from "../../domain/valueObject/VideoId";
import {redis} from "../../config/databases/redisDb";
import {StreamVideoMetadata} from "../../domain/VideoAggregate";

type CachedVideoMetadata = {
    size: number,
    format: string,
    quality: number
}

export class RedisVideoCacheRepository implements VideoCacheRepositoryPort {
    private static readonly setVideoSizeTTL = 604800 // 7 days

    public async getStreamVideoMetadata(videoId: VideoId, quality: number): Promise<StreamVideoMetadata | undefined> {
        try {
            const result = await redis.get(this.getVideoSizeKey(videoId, quality))

            if(result === null) {
                return  undefined
            }

            const decodedResult: CachedVideoMetadata = JSON.parse(result)

            return {
                size: decodedResult.size,
                format: decodedResult.format,
                quality: decodedResult.quality
            }
        } catch (error) {
            console.error('Error connecting to Redis:', error);

            throw error
        }
    }

    public async setStreamVideoMetadata(videoId: VideoId, metadata: StreamVideoMetadata): Promise<void> {
        const key = this.getVideoSizeKey(videoId, metadata.quality)
        const valToStore: CachedVideoMetadata = {
            size: metadata.size,
            format: metadata.format,
            quality: metadata.quality
        }
        const encodedVal = JSON.stringify(valToStore)

        try {
             await redis.set(
                key,
                 encodedVal,
                "EX",
                RedisVideoCacheRepository.setVideoSizeTTL
            );

        } catch (error) {
            // logger
            console.error('Error setting video size in Redis:', error);
        }
    }

    private getVideoSizeKey(videoId: VideoId, quality: number): string {
        return `video_size:${videoId.get()}:quality:${quality}`;
    }
}