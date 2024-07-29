import {VideoAggregate} from "../../VideoAggregate";
import {VideoId} from "../../valueObject/VideoId";

export interface VideoRepositoryPort {
    getVideoInfo(videoId: VideoId): Promise<VideoAggregate<VideoId> | undefined>
}