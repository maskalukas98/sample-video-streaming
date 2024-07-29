import {VideoId} from "../../valueObject/VideoId";
import {StreamVideoMetadata} from "../../VideoAggregate";


export interface VideoCacheRepositoryPort {
    getStreamVideoMetadata(videoId: VideoId, quality: number): Promise<StreamVideoMetadata | undefined>
    setStreamVideoMetadata(videoId: VideoId, metadata: StreamVideoMetadata): Promise<void>;
}

