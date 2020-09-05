# Specify a base image
FROM node:alpine

WORKDIR /usr/app

COPY . .

# Install dependencies
RUN npm install --prefix api-server
RUN npm install --prefix web-server

# Build client application
RUN npm run build --prefix web-server

# Build server application
RUN npm run build --prefix api-server

# Default Command
CMD cd api-server && npm run start