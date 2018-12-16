FROM ubuntu:16.04

WORKDIR /app

COPY . /app

RUN apt-get update
RUN apt-get install -y curl
RUN curl --silent -o- https://deb.nodesource.com/setup_8.x | bash
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
RUN apt-get update && apt-get install -y libsqlite3-dev tzdata libpq-dev ruby2.3 ruby2.3-dev git nodejs patch zlib1g-dev liblzma-dev libxml2 libxml2-dev libxslt1-dev pkg-config yarn
RUN cd /app && gem install bundler && bundle install && npm install
