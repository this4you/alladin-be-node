# Use the official Node.js image as the base
FROM node:16

# Set the working directory inside the container
WORKDIR /app

# Update npm to the latest version
RUN npm install -g npm@latest

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application code to the working directory, excluding node_modules
COPY . .

# Rebuild the bcrypt module
RUN npm rebuild bcrypt --build-from-source

# Expose the port your application will run on (if needed)
EXPOSE 8000

# Start the application
CMD ["npm", "run", "dev"]
