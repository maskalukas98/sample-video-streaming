import {KafkaConsumers} from "./config/kafka/KafkaConsumers";

const initKafka = async (): Promise<void> => {
    const kafkaConsumers = new KafkaConsumers()
    await kafkaConsumers.initViewConsumer()

    console.log("kafka consumers started.")

    const shutdown = async () => {
        await kafkaConsumers.disconnectConsumers()
        process.exit(0);
    };

    process.on('SIGTERM', () => shutdown());
    process.on('SIGINT', () => shutdown());
    process.on('SIGUSR2', () => shutdown());
}

initKafka()

