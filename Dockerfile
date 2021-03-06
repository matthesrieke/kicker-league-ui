# ---- Base Node for project build ----
FROM node:10.9 AS base

# prepare the source files for build
RUN mkdir /tmp/app

# only copy package.json, so we don't reinstall deps for every code change
COPY package.json package-lock.json /tmp/app/
# npm also allowed to run as root
RUN cd /tmp/app && npm install --unsafe-perm

COPY . /tmp/app
RUN cd /tmp/app && npm run build

# now the runnable image
FROM nginx:1.13
LABEL maintainer="Matthes Rieke <m.rieke@52north.org>"

ARG STARTUP_SCRIPT=/docker/scripts/startup.sh
ARG DEFAULT_SITE_CONF=/docker/default.conf

# some environment variables
ENV ELASTICSEARCH_HOST tcprdnavci/es
ENV UI_BASE_HREF /
ENV REST_BASE_URL /api

# install jq - required for the replacement of env variables
RUN apt-get update && \
    apt-get install --no-install-recommends -y jq && \
    apt-get -y autoremove --purge && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*


COPY ${STARTUP_SCRIPT} ./startup.sh
COPY docker/nginx.conf /etc/nginx/
#/usr/share/nginx/html/

# copy over the dist from the base build image
COPY --from=base /tmp/app/dist/ /usr/share/nginx/html/
RUN ls -la /usr/share/nginx/html

CMD ["./startup.sh"]
