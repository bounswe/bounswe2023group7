FROM node:19
WORKDIR /app
COPY package.json /app/
COPY package-lock.json /app/
RUN npm install
CMD npm run build && node --max-old-space-size=8192 dist/main
COPY . /app/