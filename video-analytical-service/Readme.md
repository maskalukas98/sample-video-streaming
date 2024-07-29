<h3>Swagger</h3>
http://localhost:8081/api-docs

<h3>Architecture</h3>
[Root project link](http://example.com)

<h3>Launch</h3>
- Run all except for node apps:
    - <strong>docker-compose up cassandra zookeeper kafka</strong>
- Run node apps:
    - <strong>docker-compose up node-http</strong>
- Run all:
    - <strong>docker-compose up</strong>

url: <strong>http://localhost:8081</strong>

Don't forget!
- After the containers are started, you have to run manually initial cassandra script (problem with auto setup).
- <strong>/bin/bash ./script.sh</strong>
