/* eslint-disable no-console */

export class Logger {
  constructor(namespace) {
    this.namespace = namespace;
  }

  get prefix() {
    return `${this.namespace} [${new Date().toISOString()}]: `;
  }

  info(...message) {
    console.log(this.prefix, ...message);
  }

  debug(...message) {
    console.debug(this.prefix, ...message);
  }

  error(...message) {
    console.error(this.prefix, ...message);
  }
}
