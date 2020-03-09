import ampq from 'amqp-connection-manager';
import { Logger } from '../logger';

export class RabbitAdapter {
  constructor({ connection, logger }, { oddsChannel, queueName }) {
    connection.on('error', e => logger.error(`disconnected from rabbitmq: ${JSON.stringify(e)}`));
    connection.on('disconnect', e => logger.error(`disconnected from rabbitmq: ${JSON.stringify(e)}`));

    this.oddsChannel = oddsChannel;
    this.queueName = queueName;
  }

  static async create(config) {
    const connection = await ampq.connect([`${config.PROTOCOL}://${config.HOST}:${config.PORT}`]);
    const oddsChannel = await connection.createChannel({
      json: true,
      setup: channel => channel.assertQueue(config.ODDS_QUEUE_NAME, { durable: true }),
    });

    return new RabbitAdapter(
      { connection, logger: new Logger(RabbitAdapter.name) },
      { oddsChannel, queueName: config.ODDS_QUEUE_NAME },
    );
  }

  send(message) {
    return this.oddsChannel.sendToQueue(this.queueName, message);
  }
}
