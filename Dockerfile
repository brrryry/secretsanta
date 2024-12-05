FROM node:20-alpine

WORKDIR /app

COPY . .

RUN apk add --no-cache --virtual builds-deps build-base python3

RUN npm install -g pnpm

RUN pnpm install

RUN pnpm run build && pnpm prune --production

EXPOSE 3001

CMD ["npm", "start"]
