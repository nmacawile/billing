FROM node:14-alpine
COPY client client
WORKDIR /client
RUN npm install
RUN npm install @angular/cli@14 -g

EXPOSE 4200
CMD ["ng", "s"]
