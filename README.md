# logger

simple node.js logger with request logger middleware

## Usage

```ts
import Logger from "logger";
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

## Example

```ts
import express, { Response } from "express";
import Logger from "logger";
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

## License

[MIT](./LICENSE)
