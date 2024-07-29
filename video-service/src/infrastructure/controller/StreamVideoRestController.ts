import {StreamVideoRequestCommand} from "../../application/command/StreamVideo";
import { Request, Response } from 'express';
import {GetVideoDetailPort} from "../../domain/port/input/GetVideoDetailPort";
import {StreamVideoPort} from "../../domain/port/input/StreamVideoPort";
import {GetVideoStreamValidation} from "./validation/GetVideoStreamValidation";
import {contextManager} from "../../httpServer";
import {logger} from "../../config/logger";


export class StreamVideoRestController {
    constructor(
        private streamVideoUseCase: StreamVideoPort,
        private getVideoDetailUseCase: GetVideoDetailPort
    ) {}

    public async getVideoDetail(req: Request, res: Response): Promise<void> {
        const videoId = req.params.videoId;

        try {
            const response = await this.getVideoDetailUseCase.getById(parseInt(videoId, 10))

            if(response === undefined) {
                res.status(404).send("Video not found.")
            } else {
                // create dto!!!!!
                res.status(200).json(response)
            }
        } catch (err) {
            logger.error({ message: "Unexpected error", url: req.url })
            res.status(500).send('Internal Server Error');
        }
    }


    public async getVideoStream(req: Request, res: Response): Promise<void> {
        const reqData = GetVideoStreamValidation.validate(req, res)

        if(!reqData) {
            return
        }

        const { range, videoId, quality  } = reqData

        try {
            const [start, end] = range.replace(/bytes=/, "").split("-");

            const command: StreamVideoRequestCommand = {
                startPos: parseInt(start, 10),
                end: end ? parseInt(end, 10) : undefined,
                quality: parseInt(quality, 10),
                videoId: parseInt(videoId, 10)
            }

            const response = await this.streamVideoUseCase.stream(command);

            res.writeHead(206, {
                "Content-Range": `bytes ${response.startPos}-${response.endPos}/${response.fileSize}`,
                "Accept-Ranges": "bytes",
                "Content-Length": response.chunkSize,
                "Content-Type": `video/${response.format}`
            });

            response.stream.pipe(res)
        } catch (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        }
    }
}