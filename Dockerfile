FROM node:18-alpine3.16 AS base-social
WORKDIR /usr/src/app
COPY social-api/package*.json ./
RUN npm install
COPY social-api .
RUN npx prisma generate
RUN npm install -g @nestjs/cli
RUN npm run build

FROM node:18-alpine3.16 as production-social
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
WORKDIR /usr/src/app
COPY social-api/package*.json ./
COPY --from=base-social /usr/src/app/node_modules ./node_modules
COPY --from=base-social /usr/src/app/dist ./dist
COPY social-api .

FROM node:18-alpine3.16 as production-auth
WORKDIR /usr/src/app
RUN npm install -g @nestjs/cli
COPY auth-api/package*.json ./
RUN yarn install
COPY auth-api .
RUN yarn build
