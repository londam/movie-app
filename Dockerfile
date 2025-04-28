# Dockerfile

# Use Node.js 20 Alpine as base (small, fast)
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Install app dependencies
COPY package.json package-lock.json* ./
RUN npm install

# Copy app files
COPY . .

# Build the Next.js app
RUN npm run build

# Expose the production port
EXPOSE 3000

# Start the Next.js app
CMD ["npm", "start"]
