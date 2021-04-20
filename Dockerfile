FROM node:6.10.3

# copy from local build machine to inside the docker image
COPY dist /dist
COPY page-server /page-server

# expose port 8080
EXPOSE 8080

# Define working directory.
WORKDIR /dist

# NOTE: this should be used in Kubernetes deployments
CMD node /page-server/lib/server.js
