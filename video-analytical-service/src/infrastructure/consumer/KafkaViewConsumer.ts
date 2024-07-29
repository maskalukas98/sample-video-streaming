import {EachMessagePayload} from "kafkajs";
import {IncreaseViewUseCasePort} from "../../domain/port/input/IncreaseViewUseCasePort";
import {logger} from "../../config/logger";


export class KafkaViewConsumer {
    constructor(
        private readonly increaseViewUseCase: IncreaseViewUseCasePort
    ) {}

    public async consumeViewEventMessage(payload: EachMessagePayload): Promise<void> {
        if(!payload.message.value) {
            return
        }

        const val = JSON.parse(payload.message.value.toString())
        const valParsed = this.validate(val)

        if(!valParsed) {
            return;
        }

        const videoId = valParsed.videoId

        try {
            await this.increaseViewUseCase.execute(videoId)
        } catch (err) {
            this.logError("Unexpected error: ", err as unknown as Record<string, unknown>)
            throw err
        }
    }

    private validate(val: Record<string, number | string>): { videoId: number } | undefined {
        if(val.videoId === undefined) {
            this.logError("videoId is undefined", val)
            return
        }

        if(typeof val.videoId !== "number") {
            this.logError("videoId is not type of number", val)
            return
        }

        return  {
            videoId: val.videoId
        }
    }

    private logError(message: string, val: Record<string, unknown>): void {
        logger.error("View message processing failed: " + message, val)
    }
}