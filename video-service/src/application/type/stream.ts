import {ReadStream} from "fs";

export type StreamVideoChunk = {
    stream: ReadStream,
    chunkSize: number,
    startPos: number,
    endPos: number
}