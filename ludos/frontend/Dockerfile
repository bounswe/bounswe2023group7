FROM node:19-alpine as base

ARG REACT_APP_API_URL
ENV REACT_APP_API_URL=${REACT_APP_API_URL}

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
