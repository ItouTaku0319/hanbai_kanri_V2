FROM golang:1.23

WORKDIR /app

RUN go install github.com/air-verse/air@latest

# go.mod と go.sum だけをコピー
COPY go.mod go.sum ./

# 依存関係をインストール
# RUN go mod tidy
RUN go mod download

COPY . .
