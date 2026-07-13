FROM node:18-alpine3.21
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser
EXPOSE 5000
CMD ["npm", "start"]
