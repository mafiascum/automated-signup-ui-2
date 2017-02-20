FROM node:6.9.1

RUN npm install webpack -g

WORKDIR /tmp
COPY package.json /tmp/
RUN npm config set registry http://registry.npmjs.org/ && npm install

WORKDIR /src

COPY . /src
RUN cp -a /tmp/node_modules /src
RUN webpack

ENV NODE_ENV=production

EXPOSE 3000

CMD [ “/usr/local/bin/npm”, “start” ]