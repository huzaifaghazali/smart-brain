# Tells docker to use node image from Docker Hub.
FROM node:16.12.0

WORKDIR /usr/src/server

COPY ./ ./ 

RUN npm install

# This tells what to run in the container.
CMD [ "/bin/bash" ]