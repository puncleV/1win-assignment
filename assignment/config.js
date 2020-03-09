export const config = {
  port: 3000,
  rabbit: {
    PROTOCOL: 'amqp',
    HOST: 'localhost',
    PORT: 5672,
    ODDS_QUEUE_NAME: 'odds',
  },
  showErrorStacktrace: true,
};
