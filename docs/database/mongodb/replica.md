# MongoDB Replica

```yml title="docker-compose.yml"
version: "3"

services:
  mongo:
    image: mongo:4.2.17
    restart: unless-stopped
    environment:
      - MONGO_INITDB_ROOT_USERNAME=admin
      - MONGO_INITDB_ROOT_PASSWORD=admin
      - MONGO_INITDB_DATABASE=admin
    volumes:
      - ./data/db:/data/db
      - ./init-mongo.js:/docker-entrypoint-initdb.d/init-mongo.js:ro
    command: mongod --oplogSize 128 --replSet rs0 --storageEngine=wiredTiger
    labels:
      - "traefik.enable=false"
    ports:
      - 7017:27017

  mongo-init-replica:
    image: mongo:4.2.17
    command: >
      bash -c
        "for i in `seq 1 30`; do
          mongo mongo/schat -u admin -p 'admin' --authenticationDatabase admin --eval \"
            rs.initiate({
              _id: 'rs0',
              members: [ { _id: 0, host: 'mongo:27017' } ]})\" &&
          s=$$? && break || s=$$?;
          echo \"Tried $$i times. Waiting 5 secs...\";
          sleep 5;
        done; (exit $$s)"
    depends_on:
      - mongo
```

```javascript title="init-mongo.js"
db.auth("admin", "admin");

db = db.getSiblingDB("schat");
db.createUser({
  user: "schat",
  pwd: "schat12345",
  roles: [{ role: "dbOwner", db: "schat" }],
});
```
