import {controllers} from "./config/dependencyInjector";
import {Router} from "express";

export const createRoutes = (): Router => {
    const router = Router()

    router.get("/video-stats/:videoId", async (req, res) => {
        await controllers.RestViewController.getTotalViewsById(req, res)
    })

    return router
}