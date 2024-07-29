#!/bin/bash

docker exec -it cassandra cqlsh -e "
CREATE KEYSPACE IF NOT EXISTS analytical
WITH replication = {
    'class': 'SimpleStrategy',
    'replication_factor': 3
};

USE analytical;

CREATE TABLE IF NOT EXISTS video_stats (
    video_id BIGINT PRIMARY KEY,
    total_views COUNTER,
    total_likes COUNTER,
    total_dislikes COUNTER
);

UPDATE video_stats
SET total_views = total_views + 0,
    total_likes = total_likes + 0,
    total_dislikes = total_dislikes + 0
WHERE video_id = 1;

"