import {StreamVideoRequestCommand, StreamVideoResponse} from "../../../application/command/StreamVideo";


export interface StreamVideoPort {
    stream(req: StreamVideoRequestCommand): Promise<StreamVideoResponse>
}