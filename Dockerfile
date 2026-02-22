# Stage 1: Build
FROM node:22-alpine AS builder
WORKDIR /app

# Install deps
COPY package*.json ./
RUN npm install

# Copy source
COPY . .

# Build standalone Next.js app
RUN npm run build

# Stage 2: Run
FROM node:22-alpine AS runner
WORKDIR /app

# Copy only what's needed for production
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

# Expose port
EXPOSE 3000

# Start the app using the standalone start script
CMD ["node", "server.js"]