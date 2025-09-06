# lolger
Yet another beautiful (useless) logger with clean formatting, colored levels and TypeScript out of the box.

## Features
- Readable, consistent format: [HH:MM:SS] [LEVEL] (namespace) message.
- Colorized levels (DEBUG/LOG/INFO/WARN/ERROR) for quick scanning.
- TypeScript-first API and shipped .d.ts types.
- Supports custom namespaces.
- Cross-platform (Node.js, Deno, Browser) compatibility.

## Install
`npm install lolger`

`pnpm add lolger`

`yarn add lolger`

Note: Chalk 5 is ESM. This package targets ESM and requires Node.js ≥ 12.20. [Chalk release notes] [26].

## Quick start
```js
import { getLogger, Logger, LogLevel } from "lolger";

setLogLevel(LogLevel.DEBUG);

const logger = getLogger("my-app");

logger.debug("Debug something", { id: 1 });
logger.log("Just a log");
logger.info("Some info:", "nothing here");
logger.warn("Oh, warn...", new Error("warning"));
logger.error("Error!!!", new Error("boom"));
```

What it looks like in a terminal:
![Example image](/images/example.png?raw=true)

## API
- `setLogLevel(level: LogLevel): void` — set global threshold.
- `getLogger(namespace: string): Logger` — returns a namespaced logger.
- `logger.debug/log/info/warn/error(...msgs: unknown[]): void;` — log messages. Accepts any number of arguments.

## Contributing
If you have any suggestions, please open an [issue](https://github.com/kitoryuwu/lolger/issues) or a [pull request](https://github.com/kitoryuwu/lolger/pulls). Thanks!

## License
Apache License 2.0. See LICENSE for full license text.
