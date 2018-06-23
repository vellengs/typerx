import { Application } from './application';

export class Start {

  async exec() {
    return new Promise((resolve, reject) => {
      const apiServer = new Application();
      apiServer
        .start()
        .then(resolve)
        .catch(reject);

      const graceful = () => {
        apiServer.stop().then(() => process.exit(0));
      };

      process.on('SIGTERM', graceful);
      process.on('SIGINT', graceful);
    });
  }

}
