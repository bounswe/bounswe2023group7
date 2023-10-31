FROM node:19-alpine as base
WORKDIR /app
COPY package.json /app/
COPY package-lock.json /app/
RUN npm install
COPY . .

FROM base as dev
CMD npm start

FROM base as prod
RUN npm run build
RUN npm install -g serve
CMD serve -s build
