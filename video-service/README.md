<h3>Swagger</h3>
http://localhost:8080/api-docs

<h3>Architecture</h3>
[Root project link](http://example.com)

<h3>Launch</h3>
- Run all except for node apps: 
  - <strong>docker-compose up postgres-db redis</strong>
- Run node apps:
  - <strong>docker-compose up node</strong>
- Run all:
  - add kafka and zookeeper if you need (probably if you start only this microservice)
  - <strong>docker-compose up node postgres-db redis</strong>

If you want to start only this service, change env for kafka (it aims to kafka in analytical service)