# Use uma imagem com Node.js para o build
FROM node:18 AS builder
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --prod

# Use uma imagem NGINX para servir o frontend
FROM nginx:stable-alpine
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist/dina-fimes /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]