import * as winston from 'winston';
import { ElasticsearchTransport } from 'winston-elasticsearch';
import { Client } from '@elastic/elasticsearch';

// Create a new Elasticsearch client
export const esClient = new Client({ node: 'http://localhost:9200', name: "analytic-service" });

const esTransportOpts = {
    level: 'info',
    client: esClient, // Use the client instance
    index: 'node-logs',
    // Optional: Define custom Elasticsearch settings here
};

export const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.Console(),
        new ElasticsearchTransport(esTransportOpts),
    ],
});

