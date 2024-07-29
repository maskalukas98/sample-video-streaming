import {VideoCdnServicePort} from "../../domain/port/output/VideoCdnServicePort";
import * as fs from "node:fs";
import {VideoId} from "../../domain/valueObject/VideoId";
import {StreamVideoMetadata} from "../../domain/VideoAggregate";
import {StreamVideoChunk} from "../../application/type/stream";


export class InternalVideoCdnService implements VideoCdnServicePort {
    constructor(
        private readonly baseVideoPath: string
    ) {}

    private getVideoPath(videoId: VideoId, quality: number, format: string): string {
        return `${this.baseVideoPath}/${videoId.get()}/${quality}.${format}`;
    }

    public getChunk(
        videoId: VideoId,
        metadata: StreamVideoMetadata,
        startPos: number,
        endPos: number,
    ): StreamVideoChunk {
        const chunkSize = (endPos - startPos) + 1;

        const videoPath = this.getVideoPath(videoId, metadata.quality, metadata.format)
        const fileStream = fs.createReadStream(videoPath, { start: startPos, end: endPos });

        return {
            stream: fileStream,
            chunkSize,
            startPos,
            endPos
        }
    }
}