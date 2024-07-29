CREATE KEYSPACE IF NOT EXISTS my_keyspace
WITH replication = {
'class' : 'SimpleStrategy',
'replication_factor' : 1
};

USE my_keyspace;

CREATE TABLE my_table (
id int PRIMARY KEY,
name text
);

INSERT INTO my_table (id, name) VALUES (1, 'Alice');
INSERT INTO my_table (id, name) VALUES (2, 'Bob');