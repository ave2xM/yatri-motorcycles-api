API server for yatri battery reservation system.

## Setup

### Install dependencies

```bash
$ npm install
```

### Start server for development

```bash
# Using npm
$ npm run dev

# Using yarn
$ yarn dev
```

### Build project

```
# Using npm
$ npm run build

# Using yarn
$ yarn build
```

### Start api server in production mode

```bash
# Using npm
$ npm run start

# Using yarn
$ yarn start
```

Open http://localhost:5000 to view it in the browser.

## Documentation (For development)

| METHOD | ENDPOINT                       | USAGE                          | BODY                                                              | RETURNS          |
| ------ | ------------------------------ | ------------------------------ | ----------------------------------------------------------------- | ---------------- |
| GET    | /api/v1/batteries              | Get all battries               |                                                                   | Batteries        |
| POST   | /api/v1/batteries/reserve/{id} | Reserve a battery              |                                                                   | Battery          |
| POST   | /api/v1/batteries              | Add new battery                | i.e. { "available": false, "location": "Thamel - 01, Kathmandu" } | Battery          |
| POST   | /api/v1/batteries/reset        | Reset all batteries avaibility |                                                                   | No content (204) |
