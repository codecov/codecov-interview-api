# Stage 1 - build frontend app
FROM node:19-alpine as build-deps

WORKDIR /app/

COPY frontend/package.json frontend/package-lock.json /app/
RUN npm ci

COPY frontend /app/
COPY .env /app/.env
RUN npm run build

# Stage 2 - nginx & frontend dist
FROM nginx:alpine

COPY nginx/prod.conf /etc/nginx/nginx.conf
COPY --from=build-deps /app/dist/ /dist/

CMD ["nginx", "-g", "daemon off;"]
