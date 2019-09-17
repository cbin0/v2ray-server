# v2ray-server
a v2ray-server(and client) docker image bulder

## Usage
```
docker run -dt --name v2rayserver -p 80:80 -p 443:443 cuibin/v2ray-server:latest -d {your_domain} -e {your_email} -u {v2ray_uuid} -p {v2ray_path}
```

## v2ray config
```
default uuid: 461aad1f-687c-4188-9abc-80073a618ca3
```

## admin
```
https://{your_domain}/admin
```

## sevelop server
```
cd server && yarn start
```

## build docker image
```
cd server && yarn build
```
