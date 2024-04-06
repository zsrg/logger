# logger

simple node.js logger with request logger middleware

## Installation

```
npm i github:zsrg/logger
```

Peer dependencies:

- `@types/express`
- `@types/node`
- `typescript`

## Usage

```ts
import Logger, { HttpLogger } from "logger";
```

### Setting logging level

Available values: `CRITICAL`, `ERROR`, `WARN`, `INFO`, `DEBUG`, `TRACE`. Default value - `INFO`.

```ts
Logger.setLevel("TRACE");
```

### Setting сustom formatting

Setting a custom log format. The function takes arguments: `date`, `level`, `message` and must return a string. Default log format: `[date] [level] message`.

```js
Logger.setFormatter((date: string, level: string, message: string) => {
  return `[${date}] [${level}] ${message}`;
});
```

### Configuring logging to file

If not specified, logs will only be output to the console.

Available filename patterns:

- `{{DATE}}` - current date

```ts
Logger.setFile(LOGS_FOLDER, "{{DATE}}.log");
```

### Using logging

```ts
Logger.critical("Critical log");
Logger.error("Error log");
Logger.warn("Warning log");
Logger.info("Information log");
Logger.debug("Debug log");
Logger.trace("Trace log");
```

Output:

```
[06-04-2024 15:36:28] [CRITICAL] Critical log
[06-04-2024 15:36:28] [ERROR] Error log
[06-04-2024 15:36:28] [WARN] Warning log
[06-04-2024 15:36:28] [INFO] Information log
[06-04-2024 15:36:28] [DEBUG] Debug log
[06-04-2024 15:36:28] [TRACE] Trace log
```

### Setting request logger middleware

Requests with response statuses less than 400 have the `INFO` level, more - `ERROR`.
For request data, it is possible to set a custom format. The function takes arguments: `req`, `res` and must return a string. Default log format: `method url statusCode`.

```ts
const httpLogger = new HttpLogger(Logger);

httpLogger.setFormatter((req: Request, res: Response) => {
  return `${req.method} ${req.url} ${res.statusCode}`;
});

app.use(httpLogger.loggerMiddleware);
```

Output:

```
[06-04-2024 16:32:23] [ERROR] GET /test 404
```

## Example

```ts
import express, { Request, Response } from "express";
import Logger, { HttpLogger } from "logger";
import path from "path";

const PORT = 3000;
const LOGS_FOLDER = path.join(process.cwd(), "logs");
const LOGS_LEVEL = "DEBUG";

const app = express();

Logger.setLevel(LOGS_LEVEL);

Logger.setFile(LOGS_FOLDER, "{{DATE}}.log");

Logger.setFormatter((date: string, level: string, message: string) => {
  return `[${date}] [${level}] ${message}`;
});

const httpLogger = new HttpLogger(Logger);

httpLogger.setFormatter((req: Request, res: Response) => {
  return `${req.method} ${req.url} ${res.statusCode}`;
});

app.use(httpLogger.loggerMiddleware);

app.get("/", (_, res: Response) => {
  res.status(200).send();
});

app.listen(PORT, () => {
  Logger.info(`Server listening on port ${PORT}`);
});
```

## Available scripts

In the project directory, you can run:

- `npm run build` - builds the library
- `npm run test` - runs the tests

## License

[MIT](./LICENSE)
