
FROM node:20

WORKDIR /usr/src/app

COPY package.json yarn.lock ./
RUN yarn install

COPY . .

# Remove this line for development:
RUN rm -rf dist && yarn build

CMD ["node", "dist/main"]
