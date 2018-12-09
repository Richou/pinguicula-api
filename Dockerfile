FROM node

# Create app directory
RUN mkdir -p /project
WORKDIR /project

# Install app dependencies
COPY package.json /project
RUN npm install

# Bundle app source
COPY src /project/src
COPY config.ts /project
COPY tsconfig.json /project

EXPOSE 3000
CMD [ "npm", "start" ]
