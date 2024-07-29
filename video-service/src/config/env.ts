import * as dotenv from 'dotenv';
dotenv.config();


const config = {
    port: process.env.PORT || 8000,
    analyticalServiceUrl: process.env.ANALYTICAL_SERVICE_URL || 'http://video-analytical-service:8000/api/v1/video-stats',
    kafkaUrl: process.env.KAFKA_URL || 'kafka:3000',

    cdnBasePath: process.env.CDN_BASE_PATH || '/',

    redis: {
        host: process.env.REDIS_HOST || 'redis',
        port: process.env.REDIS_PORT === undefined ? 6379 : parseInt(process.env.REDIS_PORT, 10),
    },

    postgres: {
        user: process.env.POSTGRES_USER || 'admin',
        password: process.env.POSTGRES_PASSWORD || 'admin123',
        host: process.env.POSTGRES_HOST || 'localhost',
        port: process.env.POSTGRES_PORT === undefined ? 5443 : parseInt(process.env.POSTGRES_PORT, 10),
        db: process.env.POSTGRES_DB || 'videos_db'
    }
};


export default config