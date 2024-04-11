FROM postgis/postgis:16-3.4-alpine
RUN chown -R 1001:0 /var/lib/postgresql/data && \
    chmod -R g=u /var/lib/postgresql/data
USER 1001