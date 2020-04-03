FROM golang:1.13-alpine

RUN apk update && apk upgrade && apk add --no-cache bash git openssh curl

WORKDIR /server

COPY . /server/
RUN go mod download
# workarround for SP-291. See https://github.com/oxequa/realize/issues/253
RUN go get gopkg.in/urfave/cli.v2@master
RUN go get github.com/tockins/realize
# RUN go get github.com/oxequa/realize

CMD ["./scripts/run-dev.sh"]