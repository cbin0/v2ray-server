FROM centos:7 as builder

WORKDIR /root

COPY docker/openssl.conf /root/

RUN yum -y install openssl && \
    openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout ssl.key -out ssl.crt -config openssl.conf && \
    cat ssl.crt ssl.key > ssl.pem && \
    cat ssl.pem && \
    curl -L -o /tmp/go.sh https://install.direct/go.sh && \
    chmod +x /tmp/go.sh && \
    /tmp/go.sh

FROM centos:7

ENV NODE_ENV=production

COPY --from=builder /usr/bin/v2ray/v2ray /usr/bin/v2ray/
COPY --from=builder /usr/bin/v2ray/v2ctl /usr/bin/v2ray/
COPY --from=builder /usr/bin/v2ray/geoip.dat /usr/bin/v2ray/
COPY --from=builder /usr/bin/v2ray/geosite.dat /usr/bin/v2ray/
COPY --from=builder /root/ssl.key /etc/nginx/
COPY --from=builder /root/ssl.pem /etc/nginx/
# copy v2ray & nginx config
COPY docker/config.json /etc/v2ray/
COPY docker/https.conf /etc/nginx/conf.d/
# copy api files
COPY api/package.json /root/api/
COPY api/index.js /root/api/
COPY api/src /root/api/src/

WORKDIR /root/api
RUN set -ex && \
    mkdir /var/log/v2ray/ && \
    chmod +x /usr/bin/v2ray/v2ctl && \
    chmod +x /usr/bin/v2ray/v2ray && \
    # install nvm & node
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash && \
    source ~/.bashrc && \
    nvm install 10.15.3 && \
    ln -sf /root/.nvm/versions/node/v10.15.3/bin/node /usr/bin/node && \
    ln -sf /root/.nvm/versions/node/v10.15.3/bin/npm /usr/bin/npm && \
    # install api node_modules
    npm install --production && \
    # install crontab
    yum -y install crontabs && \
    # install nginx
    yum -y install epel-release && \
    yum -y install nginx && \
    # install certbot
    yum-config-manager --enable rhui-REGION-rhel-server-extras rhui-REGION-rhel-server-optional && \
    yum -y install certbot python2-certbot-nginx && \
    # install crontab
    echo "0 0 15 */3 * certbot renew" | tee -a /etc/crontab > /dev/null

EXPOSE 80
EXPOSE 443

ENTRYPOINT [ "node", "/root/api/index" ]
