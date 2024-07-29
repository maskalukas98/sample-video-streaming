import express from "express"
import {createRoutes} from "./routes";
import cors from 'cors';
import {cassandraConnect, cassandraDisconnect} from "./config/cassandraDb";
import swaggerSpec from "./config/swagger";
import swaggerUi from "swagger-ui-express"
import {prometheusRoute} from "./config/prometheus";
import {esClient} from "./config/logger";
import config from "./config/env";

const app = express();

app.use(cors());
app.use("/api/v1", createRoutes())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
prometheusRoute(app)



const server = app.listen(config.httpPort, () => {
    cassandraConnect()
    console.log(`Server running at http://localhost:${config.httpPort}/`);
});

const handleExit = async (signal: string) => {
    console.log(`Received ${signal}. Closing server...`);

    await esClient.close()
    await cassandraDisconnect();
    server.close(() => {
        console.log('Server closed.');
        process.exit(0);
    });

    setTimeout(() => {
        console.error('Forced exit.');
        process.exit(1);
    }, 10000);
};

process.on('SIGINT', () => handleExit('SIGINT'));
process.on('SIGTERM', () => handleExit('SIGTERM'));
process.on('uncaughtException', async (err) => {
    console.error('Uncaught Exception:', err);
    await handleExit('uncaughtException');
});
process.on('unhandledRejection', async (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    await handleExit('unhandledRejection');
});

