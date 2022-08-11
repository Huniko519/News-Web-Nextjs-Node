FROM node:14-slim

# Install netcat used by wait-for via docker-compose and install crontab
RUN apt-get update && \
    apt-get install -y netcat && \
    apt-get install -y cron && \
    apt-get install -y curl && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /home/app

# Install node modules
COPY package.json yarn.lock ./
RUN yarn cache clean
RUN yarn --verbose

# Run webpack and next
COPY . .
RUN yarn --verbose build

EXPOSE 3333

CMD ["yarn", "start:prod"]
