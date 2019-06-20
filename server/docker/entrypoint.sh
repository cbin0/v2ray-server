#!/bin/bash

# cd /root

while getopts ":d:" optname
do
case "$optname" in
"d")
echo $OPTARG
# 替换域名
vi /etc/nginx/conf.d/https.conf <<!
  :%s/__DOMAIN__/$OPTARG/g
  :wq
!
;;
"?")
  echo "Unknown option $OPTARG"
  ;;
":")
  echo "No argument value for option $OPTARG"
  ;;
"*")
  echo "Unknown error while processing options"
  ;;
esac
done

# sh -c 'echo "fake@anonymous.com\nA" | certbot --nginx'
