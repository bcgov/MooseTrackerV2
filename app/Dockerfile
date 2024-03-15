FROM node:20

RUN mkdir app
WORKDIR app
COPY . .
ENV npm_config_cache=/tmp/
RUN npm install
RUN npm run build

EXPOSE 4173 4173
CMD ["npm", "run", "preview"]