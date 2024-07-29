import {VideoId} from "../../valueObject/VideoId";

export interface AnalyticalServicePort {
    getTotalViews(videoId: VideoId): Promise<{ totalViews: number }>
}