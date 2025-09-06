# lolger
Yet another beautiful (useless) logger.

## Install
```npm install lolger```

```pnpm add lolger```

```yarn add lolger```

Note: Chalk 5 is ESM. This package targets ESM and requires Node.js ≥ 12.20. [Chalk release notes] [26].

## Usage
```
import { getLogger, Logger, LogLevel } from "lolger";

setLogLevel(LogLevel.DEBUG);

const logger = getLogger("app:auth");

logger.debug("Debug something", { id: 1 });
logger.log("Just a log");
logger.info("Some info:", "nothing here");
logger.warn("Oh, warn:", new Error("warning"));
logger.error("Error!!!:", new Error("boom"));
```

## API
- `getLogger(namespace: string): Logger` — returns a namespaced logger.
- `Logger.level: LogLevel` — global threshold; messages with higher (more severe) or equal level pass.
- Methods: `debug`, `log`, `info`, `warn`, `error`.
