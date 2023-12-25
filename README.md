# Full Stack Implementation to Build an RAG (Retrieval Augmented Generation) Application

## Brief Introduction
A Next.js Retrieval-Augmented Generation (RAG) Application that allow users to upload PDF document and ask questions related to the selected document. 
It achieves this by retrieving pertinent data or documents related to a specific question or task and utilizing them as contextual information for the LLM.

## Preview

<img src="images/Preview.png">

##   Architecture

<img src="images/architecture.png">

## Tech Stack
- Framework: Next.js with React
- Database: MongoDB
- ORM: Prisma
- UI: Material UI, Semantic UI, Radix UI

## Run Locally
```shell
npm install
npm run dev
```

## Backend
Github: https://github.com/Nelsonlin0321/webdev-rag-backend-api

## Build Docker
```shell
image_name=rag-nextjs-app
docker build -t ${image_name}:latest -f ./Dockerfile . --platform linux/arm64/v8
docker run --env-file docker.env -p 3000:3000 -it --rm  ${image_name}:latest --name ${image_name}
```