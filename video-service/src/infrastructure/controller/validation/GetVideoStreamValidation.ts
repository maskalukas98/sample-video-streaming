import { Request, Response } from 'express';

type ReqData = {
    range: string,
    videoId: string,
    quality: string
}

export class GetVideoStreamValidation {
    public static validate(req: Request, res: Response): ReqData | undefined {
        const range = req.headers.range as string

        if(!range) {
            res.status(400).send("Range is missing.")
            return
        }

        const videoId = req.params.videoId;

        if(!videoId) {
            res.status(400).send("Video id is missing.")
            return
        }

        const quality = req.query.quality as string

        if(!quality) {
            res.status(400).send("Quality is missing.")
            return
        }

        return {
            range,
            videoId,
            quality
        }
    }
}