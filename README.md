# believe-the-rainbow

> A GitHub App built with [Probot](https://github.com/probot/probot) that A GitHub bot for PCL-Community, based on ProBot

## Setup

```sh
# Install dependencies
pnpm install

# Run the bot
pnpm start
```

## Docker

```sh
# 1. Build container
docker build -t believe-the-rainbow .

# 2. Start container
docker run -e APP_ID=<app-id> -e PRIVATE_KEY=<pem-value> believe-the-rainbow
```

## Contributing

If you have suggestions for how believe-the-rainbow could be improved, or want to report a bug, open an issue! We'd love all and any contributions.

For more, check out the [Contributing Guide](CONTRIBUTING.md).

## License

[MIT](LICENSE) © 2026 Big_Cake
