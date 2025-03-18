# Use an official Node.js runtime as a parent image
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies with npm
RUN npm install --legacy-peer-deps

# Copy the rest of your application files to the container
COPY . .

# Expose the port your app will run on
EXPOSE 3000

# Define the command to run your app
CMD ["npm", "run", "dev", "--", "--host", "--port", "3000"]