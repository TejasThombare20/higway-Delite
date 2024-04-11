FROM node

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

# Compile TypeScript
RUN npx tsc

EXPOSE 80

CMD ["node", "dist/index.js"]