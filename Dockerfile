FROM node:20-buster
RUN mkdir /app
COPY package.json /app/
WORKDIR /app
COPY . ./

RUN npm install
RUN npx prisma generate && npx prisma db push
RUN npm run build
EXPOSE 3000
CMD ["npm", "run","start"]