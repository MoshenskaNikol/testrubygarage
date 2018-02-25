#!/usr/bin/env sh
docker run -p $2:$3 -it -v $(pwd):/app $1
