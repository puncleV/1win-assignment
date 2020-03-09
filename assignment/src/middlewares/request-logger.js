import { config } from '../../config';
import {Logger} from "../logger";

const logger = new Logger('REQUEST');

const SHOW_STACKTRACE = config.showErrorStacktrace;

export const requestLogger = async (ctx, next) => {
  const methodUrl = `${ctx.request.method} ${ctx.request.originalUrl}`;

  logger.info(`--> ${methodUrl}`);

  const timeStart = Date.now();
  await next();

  if (ctx.status >= 200 && ctx.status < 400) {
    logger.info(`<-- ${methodUrl}`, {
      body: JSON.stringify(ctx.body),
    }, {
      status: ctx.status,
      time: `${Date.now() - timeStart}ms`,
    });
  } else {
    logger.error(`<-- ${methodUrl}`, {
      body: JSON.stringify(ctx.body),
    }, {
      status: ctx.status,
      time: `${Date.now() - timeStart}ms`,
      stack: SHOW_STACKTRACE ? ctx.stackTrace : undefined,
    });
  }
};
