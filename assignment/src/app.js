import { server } from './server';
import { config } from '../config';
import {RabbitAdapter} from "./queue-adapters/rabbit";
import {whitelistService} from "./middlewares"

server.listen(config.port);
// eslint-disable-next-line no-console
console.log(`server started at: ${config.port}`);

const queueAdapter = RabbitAdapter.create(config.rabbit, (message) => {
    console.log(message);
});
