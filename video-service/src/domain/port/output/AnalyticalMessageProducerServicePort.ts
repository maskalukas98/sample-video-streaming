import {VideoId} from "../../valueObject/VideoId";

export interface AnalyticalMessageProducerServicePort {
    sendVideoViewEvent(videoId: VideoId): Promise<void>
}