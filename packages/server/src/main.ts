import { Start } from './start';
const app = new Start();

app.exec().catch((error) => {
  console.error('error', error);
});

process.on('unhandledRejection', (reason: any) => {
  console.error("unhandledRejection", reason);
});

process.on('uncaughtException', (reason: any) => {
  console.error("uncaughtException", reason);
});
export default app;
