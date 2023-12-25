#!/bin/bash
docker build . -t semantic 
docker save semantic | gzip > semantic.tar.gz
rsync --rsync-path="sudo rsync" -r -avh -e "ssh -i ~/ludos-semantic.pem"  ./semantic.tar.gz ubuntu@3.77.226.88:~/semantic --delete
ssh -i ~/ludos-semantic.pem ubuntu@3.77.226.88 "sudo docker container stop semantic && sudo docker container rm semantic && cd ~/semantic && sudo docker load -i semantic.tar.gz && sudo docker run -d --name semantic -p 8000:8000 semantic && docker image prune -af && docker builder prune -f && docker builder prune -af --filter until=10m && docker volume prune -af"
```