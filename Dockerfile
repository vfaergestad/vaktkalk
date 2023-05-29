# Use the official Nginx image as the base image
FROM node:14

# Install nginx
RUN apt-get update && apt-get install -y nginx

# Copy the HTML and JS files into the Nginx container
COPY vaktkalk.html /usr/share/nginx/html/vaktkalk.html
COPY vaktkalk.js /usr/share/nginx/html/vaktkalk.js
COPY styles.css /usr/share/nginx/html/styles.css
COPY package.json /usr/share/nginx/html/package.json
COPY package-lock.json /usr/share/nginx/html/package-lock.json

RUN npm install

COPY node_modules/fomantic-ui/ /usr/share/nginx/html/node_modules/fomantic-ui/

# Expose the default Nginx port
EXPOSE 80