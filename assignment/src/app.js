import { server } from './server';
import { config } from '../config';
import {RabbitAdapter} from "./queue-adapters/rabbit";
import {whitelistService} from "./middlewares"
import {MESSAGE_TYPES} from "./constants";


RabbitAdapter.create(config.rabbit, async (message) => {
    switch (message.type) {
        case MESSAGE_TYPES.ODDS_DATA:
            const withStatus = await Promise.all(
                message.data.map(async oddsData =>({
                    enabled: await whitelistService.isEnabled(oddsData.group),
                    ...oddsData,
                }))
            );

            const toSend = withStatus.filter(odds => odds.enabled);

            console.log(toSend);
            // sender.send(toSend);
            break;
        case MESSAGE_TYPES.DISABLE_GROUP:
            await Promise.all(
                message.data.map(async oddsData =>  whitelistService.disable(oddsData.group, oddsData.reason))
            );
            break;
        default:
            throw new Error('Unsupported message type:', message.type)
    }
}).then(() => {
    server.listen(config.port);
    // eslint-disable-next-line no-console
    console.log(`server started at: ${config.port}`);
});
