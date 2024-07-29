import {VideoAggregate} from "../../domain/VideoAggregate";
import {VideoId} from "../../domain/valueObject/VideoId";
import {GetVideoDetailResponse} from "../command/GetVideoDetail";

export class VideoDetailMapper {
    public static convertAggregateToVideoDetailResponse(video: VideoAggregate<VideoId>, totalViews: number): GetVideoDetailResponse {
        return {
            title: video.getMetadata().title,
            qualities: video.getVideos().map(s => s.quality),
            totalViews
        }
    }
}