FROM node:20-buster
RUN mkdir /app
COPY package.json /app/
WORKDIR /app
COPY . ./

ENV NEXT_PUBLIC_BACKEND_URL=${NEXT_PUBLIC_BACKEND_URL}
ENV DATABASE_URL=${DATABASE_URL}

RUN npm install
RUN npx prisma generate && npx prisma db push
RUN npm run build
EXPOSE 3000
CMD ["npm", "run","start"]