import {StreamVideoPort} from "../../domain/port/input/StreamVideoPort";
import {PostgresVideoRepository} from "../../infrastructure/repository/PostgresVideoRepository";
import {VideoRepositoryPort} from "../../domain/port/output/VideoRepositoryPort";
import {VideoId} from "../../domain/valueObject/VideoId";
import {VideoCacheRepositoryPort} from "../../domain/port/output/VideoCacheRepositoryPort";
import {VideoCdnServicePort} from "../../domain/port/output/VideoCdnServicePort";
import {StreamVideoRequestCommand, StreamVideoResponse} from "../command/StreamVideo";

export class StreamVideoUseCase implements StreamVideoPort {
    constructor(
        private videoCacheRepository: VideoCacheRepositoryPort,
        private videoRepository: VideoRepositoryPort,
        private videoCdnService: VideoCdnServicePort
    ) {}

    public async stream(req: StreamVideoRequestCommand): Promise<StreamVideoResponse> {
        const videoId = new VideoId(req.videoId)
        let metadata = await this.videoCacheRepository.getStreamVideoMetadata(videoId, req.quality)

        if(metadata === undefined) {
            const videoInfo = await this.videoRepository.getVideoInfo(videoId)

            if(!videoInfo) {
                throw new Error(`Video info for ${videoId.get()} not found.`)
            }

            metadata = videoInfo.getStreamVideoMetadata(req.quality)

            if(!metadata) {
                throw new Error(`Video size with quality ${req.quality} for video ${videoId.get()} not found.`)
            }

            await this.videoCacheRepository.setStreamVideoMetadata(videoId, metadata)
        }

        const endPos = req.end ? req.end : metadata.size - 1
        const result = this.videoCdnService.getChunk(videoId, metadata, req.startPos, endPos)

        return {
            stream: result.stream,
            chunkSize: result.chunkSize,
            fileSize: metadata.size,
            startPos: result.startPos,
            endPos: endPos,
            format: metadata.format
        }
    }
}