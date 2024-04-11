FROM postgis/postgis:16-3.4-alpine

USER 1001

RUN chgrp -R 1001:0 /var/lib/postgresql/data && \
    chmod -R g=u /var/lib/postgresql/data
