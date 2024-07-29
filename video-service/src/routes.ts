import * as core from "express-serve-static-core";
import {controllers} from "./dependencyInjector";
import {AsyncContextManager} from "./util/AsyncContextManager";
import * as uuid from "uuid"
import {contextManager} from "./httpServer";
import {Router} from "express";

const startRequestContext = (contextManager: AsyncContextManager, controllerCallback: () => void) => {
    contextManager.run(async () => {
        contextManager.getStore().set('traceId', uuid.v4());
        controllerCallback()
    });
}

export const createRoutes = () => {
    const router = Router()

    router.get("/video/:videoId", async (req, res) => {
        startRequestContext(contextManager, async () => {
            await controllers.StreamVideoRestController.getVideoDetail(req, res)
        })
    })

    router.get("/video/:videoId/stream", async (req, res) => {
        startRequestContext(contextManager, async () => {
            await controllers.StreamVideoRestController.getVideoStream(req,res)
        })
    })

    return router
}