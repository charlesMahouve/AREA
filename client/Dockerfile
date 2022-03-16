FROM node:17-alpine3.14

# create & set working directory
WORKDIR /usr/src/app

COPY package*.json ./

# install dependencies
RUN npm install

# copy source files
COPY . .

# start app
EXPOSE 3000
CMD [ "npm", "run", "dev" ]