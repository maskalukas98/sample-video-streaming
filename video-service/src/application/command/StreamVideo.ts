import {ReadStream} from "fs";


export type StreamVideoRequestCommand = {
    startPos: number,
    end?: number,
    quality: number,
    videoId: number
}

export type StreamVideoResponse = {
    stream: ReadStream
    chunkSize: number,
    fileSize: number,
    startPos: number,
    endPos: number,
    format: string
}