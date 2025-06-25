# --- Builder Stage ---
FROM node:18-alpine AS builder
WORKDIR /app
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
