FROM node:12-alpine AS builder
COPY . ./angular-rustine
WORKDIR /angular-rustine
RUN npm i
RUN $(npm bin)/ng build --prod

FROM nginx:1.15.8-alpine
COPY --from=builder /angular-rustine/dist/angular-rustine/ /usr/share/nginx/html