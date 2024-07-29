import {GetViewUseCasePort} from "../../domain/port/input/GetViewUseCasePort";
import {VideoStatsRepositoryPort} from "../../domain/port/output/VideoStatsRepositoryPort";
import {VideoId} from "../../domain/valueObject/VideoId";

export class GetViewUseCase implements GetViewUseCasePort {
    constructor(
        private videoStatsRepository: VideoStatsRepositoryPort
    ) {}

    public async getById(videoId: number): Promise<number | undefined> {
        return await this.videoStatsRepository.getTotalViews(new VideoId(videoId))
    }
}