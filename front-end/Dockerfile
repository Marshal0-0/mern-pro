# --- Builder Stage ---
FROM node:18-alpine AS builder
WORKDIR /app

# Accept build-time variables for Vite
ARG VITE_API_BASE_URL
ARG VITE_USER_SERVICE_URL
ARG VITE_PRODUCT_SERVICE_URL
ARG VITE_CART_SERVICE_URL

# Set them as environment variables for the build
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL \
    VITE_USER_SERVICE_URL=$VITE_USER_SERVICE_URL \
    VITE_PRODUCT_SERVICE_URL=$VITE_PRODUCT_SERVICE_URL \
    VITE_CART_SERVICE_URL=$VITE_CART_SERVICE_URL

COPY package*.json ./
COPY . .
RUN npm install --frozen-lockfile \
    && npm run build

# --- Production Stage ---
FROM node:18-alpine AS production
WORKDIR /app
RUN npm install -g vite
COPY --from=builder /app/dist ./dist
EXPOSE 80
ENTRYPOINT ["vite", "preview", "--port", "80", "--host"]
