FROM node:22-alpine AS build

# Set working directory
WORKDIR /app

# Install dependencies
COPY app/package*.json ./
RUN npm ci && npm cache clean --force

# Copy the rest of the app's source code
COPY app/. .

# Build the Angular app for production
RUN npm run build --prod

# Stage 2: Serve the app with Nginx
FROM nginx:alpine

# Copy the built Angular app
COPY --from=build /app/dist/urlshortner /usr/share/nginx/html

# Copy custom Nginx configuration (adjust if needed)
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
