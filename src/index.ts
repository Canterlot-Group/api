import config from 'config';
import app from './app';

const ipAddress: string = config.get('http.ipAddress');
const port: number      = config.get('http.port');

const server = app.listen(port, ipAddress, () => {
  console.log(`Server listening on ${ipAddress}:${port}`);
});
