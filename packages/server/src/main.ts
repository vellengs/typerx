import { start } from './start';
const app = start().catch(err => {
  console.error(`Error starting server: ${err.message}`);
  process.exit(-1);
});
export default app;
