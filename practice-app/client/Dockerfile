FROM --platform=linux/amd64 node:11.15
WORKDIR /app
COPY . .
RUN npm ci 
RUN npm run build
CMD [ "npx", "serve", "build" ]