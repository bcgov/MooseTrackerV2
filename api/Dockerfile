# syntax=docker/dockerfile:1

# Comments are provided throughout this file to help you get started.
# If you need more help, visit the Dockerfile reference guide at
# https://docs.docker.com/go/dockerfile-reference/

FROM node:20


# Copy the rest of the source files into the image.

ENV npm_config_cache=/tmp/
RUN mkdir app
WORKDIR app
COPY . .
RUN npm install

# Run the application as a non-root user.
USER node

# Expose the port that the application listens on.
EXPOSE 7080

CMD ["npm", "start"]