import {Kafka} from "kafkajs";
import config from "./env";


export const kafka = new Kafka({
    clientId: 'video-service',
   // brokers: ['localhost:9092'],
    brokers: [config.kafkaUrl],
});

