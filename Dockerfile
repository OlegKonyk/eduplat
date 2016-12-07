FROM node:6.9.1

RUN node --version
ADD . .
#RUN npm install -g bower
#RUN npm install
#RUN npm install
#RUN bower install --allow-root
#RUN node server/server.js
EXPOSE 3030

CMD NODE_ENV=docker node server/server.js

#Fix port for production deployment