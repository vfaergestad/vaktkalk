FROM nginx:latest as app

# Copy the HTML and JS files into the Nginx container
COPY ./ /usr/share/nginx/html/

EXPOSE 80/tcp