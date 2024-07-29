import {IncreaseViewUseCasePort} from "../../domain/port/input/IncreaseViewUseCasePort";
import {VideoStatsRepositoryPort} from "../../domain/port/output/VideoStatsRepositoryPort";
import {VideoId} from "../../domain/valueObject/VideoId";

export class IncreaseViewUseCase implements IncreaseViewUseCasePort {
    constructor(
        private readonly videoStatsRepository: VideoStatsRepositoryPort
    ) {}

    public async execute(videoId: number): Promise<void> {
        await this.videoStatsRepository.increaseView(new VideoId(videoId))
    }
}