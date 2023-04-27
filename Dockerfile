FROM node:14-alpine
WORKDIR /opt/app
add package.json package.json
RUN npm install
ADD . .
RUN npm run build
RUN npm prune --production
cmd ["node", "./dist/main.js"]