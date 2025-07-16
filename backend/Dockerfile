# Use official Node.js image
FROM node:18

# Set working directory
WORKDIR /app

# Copy project files
COPY package*.json ./
RUN npm install

COPY . .

# Expose port (change if your app uses another)
EXPOSE 5000

# Start the app
CMD ["npm", "start"]
