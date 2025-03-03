FROM node:20
WORKDIR /home/node/app
COPY package*.json ./
COPY --chown=node:node . .
RUN npm install
RUN npm run build
RUN cd /home/node/app/prod
CMD ["node","index.cjs"]