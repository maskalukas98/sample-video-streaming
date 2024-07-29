import {VideoId} from "../../domain/valueObject/VideoId";
import {AnalyticalMessageProducerServicePort} from "../../domain/port/output/AnalyticalMessageProducerServicePort";
import {kafka} from "../../config/kafka";

export class KafkaAnalyticalMessageProducerService implements AnalyticalMessageProducerServicePort {
    private readonly producer = kafka.producer()
    private readonly viewEventTopic: string = 'view_event';

    constructor() {
        this.producer.connect()
    }

    public async sendVideoViewEvent(videoId: VideoId): Promise<void> {
        await this.producer.send({
            topic: this.viewEventTopic,
            messages: [{ value: JSON.stringify({ videoId: videoId.get() })}]
        });
    }
}