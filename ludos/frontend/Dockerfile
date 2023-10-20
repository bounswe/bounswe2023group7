FROM node:19
WORKDIR /app
COPY package.json /app/
COPY package-lock.json /app/
RUN npm install
COPY . .
CMD [ "npm", "start" ]