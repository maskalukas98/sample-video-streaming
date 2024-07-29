import cassandra from "cassandra-driver"
import config from "./env";



export const cassandraClient = new cassandra.Client({
    contactPoints: [config.cassandraContactPoints],
    localDataCenter: 'datacenter1',
    keyspace: 'analytical'
});

export const cassandraConnect = () => {
    cassandraClient.connect()
        .then(() => console.log('Connected to Cassandra'))
        .catch(err => console.error('Error connecting to Cassandra:', err));
}

export const cassandraDisconnect = async (): Promise<void> => {
    return cassandraClient.shutdown()
}