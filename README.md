# release-slack-notify
checks wallet releases and notifies slack

### Docker command
```
mkdir -p .release-notify
nano /home/$USER/.release-notify/release.env
// add the following
// NODE_ENV=production
// API_URL=https://hooks.slack.com/services/REPLACEWITHAPIKEY
```
### Run Docker
```
docker run --name=release-notify -d \
      -v /home/$USER/.release-notify/release.env:/usr/src/app/.env \
      bitsler/docker-release-notify:latest
```