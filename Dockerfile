FROM node:latest

# Set the working directory
WORKDIR /app

COPY . .

WORKDIR /app/DOXIE_FRONTEND/
RUN rm -rf node_modules/ 
WORKDIR /app
RUN npm install
RUN mkdir -p /app/host
EXPOSE 5173

CMD ["npm","run","dev","--","--host"]
