import {VideoId} from "../../valueObject/VideoId";

export interface VideoStatsRepositoryPort {
    increaseView(videoId: VideoId): Promise<void>
    getTotalViews(videoId: VideoId): Promise<number | undefined>
}