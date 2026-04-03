# -- BƯỚC 1: Build ứng dụng React --
FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# -- BƯỚC 2: Chạy ứng dụng bằng Nginx --
FROM nginx:alpine

# Copy cấu hình nginx tùy chỉnh
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy file build từ bước 1 vào thư mục của Nginx
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
