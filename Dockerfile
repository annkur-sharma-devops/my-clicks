# Stage 1: Build the Next.js app
FROM node:18-alpine AS builder
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy all source files and build
COPY . .
RUN npm run build

# Stage 2: Run production server with Express
FROM node:18-alpine AS runner
WORKDIR /app

# Install only production dependencies
COPY package*.json ./
RUN npm install --omit=dev

# Copy the Next.js standalone build and static files
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

# Copy required app source files
COPY --from=builder /app/styles ./styles
COPY --from=builder /app/pages ./pages
COPY --from=builder /app/components ./components

# Copy your custom Next.js server
COPY server.js ./

# Create empty uploads folder (mounted at runtime)
RUN mkdir -p public/uploads

# Expose the port your app runs on
EXPOSE 3000

# Bind to 0.0.0.0 explicitly to allow access from outside the container
ENV HOST=0.0.0.0

CMD ["node", "server.js"]
