import ampq from 'amqp-connection-manager';
import { Logger } from '../logger';

export class RabbitAdapter {
    constructor({ connection, logger }, { oddsChannel, queueName }) {
        connection.on('connect', e => logger.error(`connected from rabbitmq: ${JSON.stringify(e)}`));
        connection.on('error', e => logger.error(`disconnected from rabbitmq: ${JSON.stringify(e)}`));
        connection.on('disconnect', e => logger.error(`disconnected from rabbitmq: ${JSON.stringify(e)}`));

        this.oddsChannel = oddsChannel;
        this.queueName = queueName;
    }

    static async create(config, messageHandler) {
        const logger = new Logger(RabbitAdapter.name);

        const connection = await ampq.connect([`${config.PROTOCOL}://${config.HOST}:${config.PORT}`]);
        const oddsChannel = await connection.createChannel({
            json: true,
            setup: channel => Promise.all([
                channel.assertQueue(config.ODDS_QUEUE_NAME, {durable: true}),
                channel.prefetch(config.PREFETCH),
                channel.consume(config.ODDS_QUEUE_NAME, async (data) => {
                    const message = JSON.parse(data.content.toString());

                    try {
                        await messageHandler(message);
                    } catch (e) {
                        logger.error(e);
                    }

                    channel.ack(data);
                } )
            ]),
        });

        oddsChannel.waitForConnect();

        return new RabbitAdapter(
            { connection, logger },
            { oddsChannel, queueName: config.ODDS_QUEUE_NAME },
        );
    }
}
