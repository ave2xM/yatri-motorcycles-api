<div align="center">

![](./yatri.png)

> Simple real time battery reservation demo. [Click for live demo!](https://yatrimotors.herokuapp.com/)

</div>

## Requirements

- NodeJS >= 10
- NPM >= 6.x

## Setup

### Clone the repository

```bash

# Clone with SSH
$ git@github.com:manjillama/yatri-battery-api.git

# Or with HTTPS
$ git clone https://github.com/manjillama/yatri-battery-api.git
```

### Install dependencies

Nagivate to **api-server** and **web-server** and install dependencies using npm

```bash
# Navigate to api-server directory
$ npm install

# Navigate to web-server directory
$ npm install
```

Start web server. Navigate to **web-server** and run

```bash
# Using npm
$ npm run start

# Using yarn
$ yarn start
```

Start api server. Navigate to **api-server** and run

```bash
# Using npm
$ npm run dev

# Using yarn
$ yarn dev
```

Start api server in production mode

```bash
$ npm run start
```

Build web server for production mode

```bash
$ npm run build
```

### Configurations

For custom configurations navigate to respective server folders and update the **.env** file

## Quickstart using docker

```bash
# Start server
$ docker-compose up

# Stop server
$ docker-compose down
```

## Documentation (For development)

| METHOD | ENDPOINT                       | USAGE                          | BODY                                                              | RETURNS          |
| ------ | ------------------------------ | ------------------------------ | ----------------------------------------------------------------- | ---------------- |
| GET    | /api/v1/batteries              | Get all battries               |                                                                   | Batteries        |
| POST   | /api/v1/batteries/reserve/{id} | Reserve a battery              |                                                                   | Battery          |
| POST   | /api/v1/batteries              | Add new battery                | i.e. { "available": false, "location": "Thamel - 01, Kathmandu" } | Battery          |
| POST   | /api/v1/batteries/reset        | Reset all batteries avaibility |                                                                   | No content (204) |
