FROM node:14-alpine
RUN apk add git
RUN git config --global core.autocrlf true
WORKDIR /app
COPY . .
RUN npm install
RUN npm install @angular/cli@14 -g

EXPOSE 4200
CMD ["ng", "s", "--host", "0.0.0.0"]
