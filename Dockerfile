FROM node:10.15.3

USER root

COPY build /work/hawthorn
WORKDIR /work/hawthorn

CMD yarn start
