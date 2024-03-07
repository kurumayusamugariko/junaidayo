# フロントエンドをビルドするためのステージ
FROM node:18 AS build
WORKDIR /app
COPY front/package*.json ./
RUN npm install
COPY front/ ./
ENV API_URL=https://junaidayo-vm2tzccgea-uc.a.run.app/edit
RUN npm run build

# バックエンドを実行するためのステージ
FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY --from=build /app/build ./front/build
COPY . .

# Google Cloud SQLとの接続を設定するための環境変数
ENV DB_HOST=127.0.0.1
ENV INSTANCE_CONNECTION_NAME=golden-attic-416503:us-central1:junaipanda
ENV DB_USER=quickstart-user
ENV DB_PASS=okkotupaisen
ENV DB_NAME=junaidayo


# 環境変数PORTで指定されたポートでアプリケーションを実行
EXPOSE $PORT
CMD [ "node", "index.js" ]