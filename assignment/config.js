export const config = {
  port: 3000,
  rabbit: {
    PROTOCOL: 'amqp',
    HOST: process.env.RABBIT_HOST || "localhost",
    PORT: 5672,
    ODDS_QUEUE_NAME: 'odds',
    PREFETCH: 1,
  },
  database: {
    host: process.env.DATABASE_HOST || "localhost",
    port: 3306,
    user: 'user',
    password: 'password',
    name: 'assignment',
  },
  showErrorStacktrace: true,
};
