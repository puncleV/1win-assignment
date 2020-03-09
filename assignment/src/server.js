import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import cors from '@koa/cors';

import {
    errorHandler, requestLogger,
} from './middlewares';

const app = new Koa();

app
    .use(cors())
    .use(requestLogger)
    .use(errorHandler)
    .use(bodyParser());

export const server = app;
