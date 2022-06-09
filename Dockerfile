# syntax=docker/dockerfile:1
FROM node:16.15.1-slim
WORKDIR /app
ENV NODE_ENV=production
COPY package.json yarn.lock src ./
RUN yarn install 
COPY . .
RUN yarn run build --noninteractive
CMD ["node", "build/server.js"]
EXPOSE 3000

