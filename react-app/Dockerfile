FROM node:18-alpine AS build
WORKDIR /app

# Install dependencies first (better caching)
COPY package.json package-lock.json* ./
RUN npm install --no-audit --no-fund

# Copy source and build
COPY . .
RUN npm run build

# --- Runtime image ---
FROM node:18-alpine AS runtime
WORKDIR /app
RUN npm i -g serve@14

COPY --from=build /app/dist ./dist

EXPOSE 3000
CMD ["serve", "-s", "dist", "-l", "3000"]


