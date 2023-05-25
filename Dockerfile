# Node.js base image
FROM node:latest

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

# Expose the port the app runs in
EXPOSE 3000

# Serve the app
CMD [ "node", "app.js" ]
