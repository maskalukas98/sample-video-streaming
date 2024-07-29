import {EachMessagePayload} from "kafkajs";
import {kafka} from "./kafka";
import {consumers} from "../dependencyInjector";

export class KafkaConsumers {
    // move to env!!!
    private static readonly topic = "view_event"
    private static readonly viewDlqTopic = "view-dlq-topic"

    private readonly producer = kafka.producer()
    private readonly viewConsumer = kafka.consumer({ groupId: 'view-event-analytics-group' });

    public async initViewConsumer(): Promise<void> {
        await this.viewConsumer.connect()
        // @ts-ignore
        await this.viewConsumer.subscribe({ topic: KafkaConsumers.topic, fromOffset: "latest" });

        await this.viewConsumer.run({
            eachMessage: async (payload: EachMessagePayload) => {
                try {
                    await consumers.KafkaViewConsumer.consumeViewEventMessage(payload)
                } catch (err) {
                    await this.producer.send({
                        topic: KafkaConsumers.viewDlqTopic,
                        messages: [{ value: payload.message.value }],
                    });
                }
            },
        });
    }

    public async disconnectConsumers(): Promise<void> {
        await this.producer.disconnect()
        await this.viewConsumer.disconnect()
    }
}