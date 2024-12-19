# Use the official Node.js version 18 base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json first to leverage Docker layer caching
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy the rest of the application code
COPY . .

# Build the NestJS application
RUN npm run build

# Expose the port the app runs on (default is 3000 for NestJS)
EXPOSE 3001

# Set the command to run the NestJS app in production mode
CMD ["npm", "run", "start:prod"]
