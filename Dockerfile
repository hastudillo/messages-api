# Stage
FROM node:20-alpine as builder

WORKDIR /app

ENV NODE_ENV development

COPY package.json /app/

RUN npm install

COPY . .

RUN npm run build

# Final production image
FROM node:20-alpine

WORKDIR /app

ENV NODE_ENV production

COPY package.json /app/

RUN npm install

COPY --from=builder /app/dist /app/dist

ENV MYSQL_HOST host.docker.internal
ENV MYSQL_PORT 3306
ENV MYSQL_ROOT_USER root
ENV MYSQL_SYNCHRONIZE true
ENV APP_PORT 3000
ENV API_KEY abcdef12345
ENV JWT_SECRET your-256-bit-secret

EXPOSE 3000

ENTRYPOINT [ "node", "dist/main" ]