import {VideoMetadata} from "./entity/VideoMetadata";
import {VideoId} from "./valueObject/VideoId";
import {VideoQuality} from "./entity/VideoQuality";

export type StreamVideoMetadata = {
    size: number,
    format: string,
    quality: number
}

export class VideoAggregate<T> {
    constructor(
        private id: VideoId<T>,
        private metadata: VideoMetadata,
        private videos: VideoQuality[] = []
    ) {}

    public static create<T>(id: T, metadata: VideoMetadata, videos: VideoQuality[]): VideoAggregate<T> {
        return new VideoAggregate(
            new VideoId(id),
            metadata,
            videos
        )
    }

    public getStreamVideoMetadata(quality: number): StreamVideoMetadata | undefined {
        const video = this.videos.find(s => s.quality === quality)

        if(!video) {
            return  undefined
        }

        return {
            size: video.size,
            format: video.format,
            quality: video.quality
        }
    }

    public getId(): VideoId<T> {
        return this.id
    }

    public getMetadata(): VideoMetadata {
        return this.metadata
    }

    public getVideos(): VideoQuality[] {
        return this.videos
    }
}