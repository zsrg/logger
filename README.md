# logger

simple node.js logger with request logger middleware

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

Available filename patterns:

- `{{DATE}}` - current date

Options:

- `flags` - file system [flags](https://nodejs.org/api/fs.html#file-system-flags)
- `rotation` - file rotation rules, аvailable values - `midnight`

```ts
Logger.setFile(LOGS_FOLDER, "{{DATE}}.log", { rotation: "midnight" });
```

If not specified, the logs will only be output to the console.

### Using logging

Multiple arguments can be passed, which are converted using [`util.format`](https://nodejs.org/api/util.html#utilformatformat-args), similar [`console.log`](https://nodejs.org/api/console.html#consolelogdata-args).

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
[2025-02-09 20:45:57] [CRITICAL] Critical log
[2025-02-09 20:45:57] [ERROR] Error log
[2025-02-09 20:45:57] [WARN] Warning log
[2025-02-09 20:45:57] [INFO] Information log
[2025-02-09 20:45:57] [DEBUG] Debug log
[2025-02-09 20:45:57] [TRACE] Trace log
```

### Setting request logger middleware

Requests with response statuses less than 400 have the `INFO` level, more - `ERROR`.

A custom format can be set for the request data. The function takes arguments: `req`, `res` and must return a string. The default log format is `method url statusCode`.

Request filtering is also available. Like formatter, the function takes arguments: `req`, `res`. It must return a boolean value. By default, all requests are logged.

```ts
const httpLogger = new HttpLogger(Logger);

httpLogger.setFormatter((req: Request, res: Response) => {
  return `${req.method} ${req.url} ${res.statusCode}`;
});

httpLogger.setFilter((req: Request, res: Response) => {
  return res.statusCode >= 400;
});

app.use(httpLogger.loggerMiddleware);
```

Output:

```
[2025-02-09 20:45:57] [ERROR] GET /test 404
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

Logger.setFile(LOGS_FOLDER, "{{DATE}}.log", { rotation: "midnight" });

Logger.setFormatter((date: string, level: string, message: string) => {
  return `[${date}] [${level}] ${message}`;
});

const httpLogger = new HttpLogger(Logger);

httpLogger.setFormatter((req: Request, res: Response) => {
  return `${req.method} ${req.url} ${res.statusCode}`;
});

httpLogger.setFilter((req: Request, res: Response) => {
  return res.statusCode >= 400;
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
