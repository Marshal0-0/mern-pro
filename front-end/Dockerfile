# --- Builder Stage ---
FROM node:18-alpine AS builder
WORKDIR /app

# Copy package files and source code
COPY package*.json ./
COPY . .

# Load environment variables from .env (if present)
# Accept build arguments for service URLs
ARG VITE_USER_SERVICE_URL
ARG VITE_PRODUCT_SERVICE_URL
ARG VITE_CART_SERVICE_URL

# Set them as environment variables for the build
ENV VITE_USER_SERVICE_URL=$VITE_USER_SERVICE_URL \
    VITE_PRODUCT_SERVICE_URL=$VITE_PRODUCT_SERVICE_URL \
    VITE_CART_SERVICE_URL=$VITE_CART_SERVICE_URL

# Replace all 'localhost' URLs in the code with the provided service URLs
RUN grep -rl 'localhost' ./src | xargs sed -i \
    -e "s|localhost:3001|$VITE_USER_SERVICE_URL|g" \
    -e "s|localhost:3002|$VITE_PRODUCT_SERVICE_URL|g" \
    -e "s|localhost:3003|$VITE_CART_SERVICE_URL|g"

# Install dependencies and build the app
RUN npm install --frozen-lockfile && npm run build

# --- Production Stage ---
FROM nginx:alpine AS production
# Copy built files from builder
COPY --from=builder /app/dist /usr/share/nginx/html
# Expose port 80
EXPOSE 80
# Start nginx
CMD ["nginx", "-g", "daemon off;"]
