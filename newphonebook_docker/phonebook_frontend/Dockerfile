# Test stage
FROM node:20 AS test-stage

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run test

# Build stage
FROM node:20 AS build-stage

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . .

ENV VITE_BACKEND_URL=http://localhost:8080/api/persons/

RUN npm run build

# Production stage
FROM nginx:1.25.0-alpine

COPY --from=build-stage /usr/src/app/public /usr/share/nginx/html