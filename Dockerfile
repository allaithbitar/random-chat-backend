FROM oven/bun
COPY . .
RUN bun install --frozen-lockfile
RUN bun build ./src/index.ts --outdir ./build
EXPOSE 3000
CMD ["bun", "./build/index.js"]

