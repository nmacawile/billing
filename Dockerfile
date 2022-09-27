FROM node:14-alpine AS client-builder
COPY client client
WORKDIR /client
RUN npm install
RUN npm install @angular/cli -g
RUN ng build

FROM ruby:2.7.4-alpine AS builder
RUN apk add \
  build-base \
  git
COPY Gemfile* .
RUN gem install bundler:2.2.24
RUN bundle install

FROM ruby:2.7.4-alpine AS runner
RUN apk add \
    tzdata \
    nodejs \
    git
WORKDIR /app
COPY . .
RUN rm -rf public
COPY --from=builder /usr/local/bundle/ /usr/local/bundle/
COPY --from=client-builder /client/dist/client public

EXPOSE 3000
CMD ["rails", "server", "-b", "0.0.0.0"]
