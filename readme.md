# Pinguicula Rest API

This is the server side for pinguicula project

## Prerequisites

 - NodeJS
 - Docker
 - docker-compose

## Launch docker

The docker compose file contains the mongoDB containers

```bash
$ sudo docker-compose up -d
```

## Configuration

Create key pair :

http://www.csfieldguide.org.nz/en/interactives/rsa-key-generator/index.html

And save the private and the public key.

Create a .env file with : 

```
SERVER_PORT=3000
APPLICATION_LOG_LEVEL=debug
DATABASE_URL=mongodb://localhost:27017/pinguicula
PHOTO_DIR_PATH=/some/photo/path
PRIVATE_KEY_FILE=/path/to/private.key
PUBLIC_KEY_FILE=/path/to/public.key
```

## Todo

 - Scheduler Jobs
 - Use Dependency Injection
 - Implements Swagger for api documentation and for client generation
 - Units tests