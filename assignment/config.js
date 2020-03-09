export const config = {
  port: 3000,
  rabbit: {
    PROTOCOL: 'amqp',
    HOST: 'localhost',
    PORT: 5672,
    ODDS_QUEUE_NAME: 'odds',
  },
  database: {
    host: 'localhost',
    port: 3306,
    user: 'user',
    password: 'password',
    name: 'assignment',
  },
  showErrorStacktrace: true,
};
