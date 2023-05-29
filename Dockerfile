FROM node:latest as build

# Copy the HTML and JS files into the Nginx container
COPY vaktkalk.html /srv/index.html
COPY vaktkalk.js /srv/vaktkalk.js
COPY styles.css /srv/styles.css
COPY package.json /srv/package.json
COPY package-lock.json /srv/package-lock.json

RUN chown -R node:node /srv

USER node
WORKDIR /srv

RUN npm install
RUN npx grunt prod

FROM nginx:latest as app

COPY --from=build /srv /usr/share/nginx/html

EXPOSE 80/tcp