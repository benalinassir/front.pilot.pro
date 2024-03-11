# Stage 1: Build the Angular application
FROM node:14.17.0 AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN npm run build -- --prod

# Stage 2: Serve the Angular application with a lightweight HTTP Server
FROM nginx:1.21.3-alpine

COPY --from=builder /app/dist/your-angular-project /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
