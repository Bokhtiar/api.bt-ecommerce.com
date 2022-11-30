# Node version
FROM node:16

# Make work directory
WORKDIR /usr/src/app

# Copy files
COPY package*.json ./
COPY tsconfig.json ./
COPY . ./

# NPM install & build
RUN npm install
RUN npm run build

# POR define
EXPOSE 4000


# Open CMD & execute command
CMD [ "npm", "start"]