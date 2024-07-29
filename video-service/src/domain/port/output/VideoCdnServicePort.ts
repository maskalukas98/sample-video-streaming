import {VideoId} from "../../valueObject/VideoId";
import {StreamVideoMetadata} from "../../VideoAggregate";
import {StreamVideoChunk} from "../../../application/type/stream";

export interface VideoCdnServicePort {
    getChunk(videoId: VideoId, metadata: StreamVideoMetadata, startPos: number, end: number): StreamVideoChunk
}