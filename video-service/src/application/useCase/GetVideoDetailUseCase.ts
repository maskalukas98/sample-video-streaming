import {GetVideoDetailPort} from "../../domain/port/input/GetVideoDetailPort";
import {GetVideoDetailResponse} from "../command/GetVideoDetail";
import {VideoRepositoryPort} from "../../domain/port/output/VideoRepositoryPort";
import {VideoId} from "../../domain/valueObject/VideoId";
import {VideoDetailMapper} from "../mapper/VideoDetailMapper";
import {AnalyticalServicePort} from "../../domain/port/output/AnalyticalServicePort";
import {AnalyticalMessageProducerServicePort} from "../../domain/port/output/AnalyticalMessageProducerServicePort";

export class GetVideoDetailUseCase implements GetVideoDetailPort {
    constructor(
        private videoRepository: VideoRepositoryPort,
        private analyticalVideoService: AnalyticalServicePort,
        private analyticalMessageProducer: AnalyticalMessageProducerServicePort
    ) {}

    public async getById(videoId: number): Promise<GetVideoDetailResponse> {
        const videoIdRef = new VideoId(videoId)
        const video = await this.videoRepository.getVideoInfo(videoIdRef);

        if(!video) {
            throw new Error(`Video ${videoId} not found`);
        }


        const videoStats = await this.analyticalVideoService.getTotalViews(videoIdRef)
        this.analyticalMessageProducer.sendVideoViewEvent(videoIdRef)
        return VideoDetailMapper.convertAggregateToVideoDetailResponse(video, videoStats.totalViews + 1)
    }
}