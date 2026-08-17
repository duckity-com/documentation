FROM oven/bun:latest

WORKDIR /app
COPY . /app

RUN bun install
RUN bun run build

ENTRYPOINT [ "bun" ]
CMD [ "run", "start" ]
