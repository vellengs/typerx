import { start } from './start';
const app = start().catch(err => {
  console.error(`Error starting server: ${err.message}`);
  process.exit(-1);
});

process.on('unhandledRejection', (reason: any) => {
  console.log("unhandledRejection", reason);
});

process.on('uncaughtException', (reason: any) => {
  console.log("uncaughtException", reason);
});
export default app;
