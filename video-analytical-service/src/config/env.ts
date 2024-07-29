import * as dotenv from 'dotenv';
dotenv.config();

type Config = {
    httpPort: number,
    cassandraContactPoints: string,
    kafkaUrl: string
}

const config: Config = {
    httpPort: process.env.HTTP_PORT === undefined ? 8000 : parseInt(process.env.HTTP_PORT, 10),
    cassandraContactPoints: process.env.CASSANDRA_CONTACT_POINTS ?? "127.0.0.1:9042",
    kafkaUrl: process.env.KAFKA_URL || 'kafka:3000',
}


export default config