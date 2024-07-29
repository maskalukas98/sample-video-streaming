import * as winston from 'winston';
import { ElasticsearchTransport } from 'winston-elasticsearch';
import { Client } from '@elastic/elasticsearch';
import {contextManager} from "../httpServer";

export const esClient = new Client({ node: 'http://localhost:9200', name: "analytic-service" });



class CustomElasticsearchTransport extends ElasticsearchTransport {
    log(info: any, callback: any) {
        const message = {
            object: {
                ...info,
            },
            traceId: contextManager.getStore().get("traceId"),
            level: info.level
        }
        message.level = message.object.level
        message.object.level = undefined
        message.object.message = undefined

        console.log(message)

        // @ts-ignore
        super.log(message, callback);
    }
}

const esTransportOpts = {
    level: 'info',
    client: esClient,
    // move to env
    index: 'dev-video-service',
};

export const logger = winston.createLogger({
    level: 'info',
    transports: [
        new winston.transports.Console(),
        new CustomElasticsearchTransport(esTransportOpts),
    ],
});

