import {GetViewUseCasePort} from "../../domain/port/input/GetViewUseCasePort";
import { Request, Response } from 'express';
import {logger} from "../../config/logger";

export class RestViewController {
    constructor(
        private readonly getViewUseCase: GetViewUseCasePort
    ) {}

    public async getTotalViewsById(req: Request, res: Response): Promise<void> {
        const videoId = req.params.videoId;

        try {
            const totalViews = await this.getViewUseCase.getById(parseInt(videoId, 10))

            if(totalViews === undefined) {
                res.status(404).send("Video not found.")
            } else {
                // create dto!!!!!
                res.status(200).json({ totalViews })
            }
        } catch (err) {
            logger.error("Unexpected error.", err)
            res.status(500).send('Internal Server Error');
        }
    }
}