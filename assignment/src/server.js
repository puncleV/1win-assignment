import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import cors from '@koa/cors';

import {
    errorHandler, requestLogger,
} from './middlewares';
import {addRepositoriesToContext} from "./middlewares";
import {whitelistRouter} from "./router/whitelist";

const app = new Koa();

app
    .use(cors())
    .use(requestLogger)
    .use(errorHandler)
    .use(bodyParser())
    .use(addRepositoriesToContext)
    .use(whitelistRouter.routes())
    .use(whitelistRouter.allowedMethods());

export const server = app;
