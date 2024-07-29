import { Kafka } from "kafkajs"
import config from "../env";


export const kafka = new Kafka({
    clientId: 'analytical-service',
    brokers: [config.kafkaUrl],
});
