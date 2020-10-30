import config from 'config';
import app from './app';

const server = app.listen(config.get('http.port'), config.get('http.ipAddress'), () => {
  console.log(`Server listening on 0.0.0.0:8123`);
});
