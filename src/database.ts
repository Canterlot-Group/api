import { Sequelize } from 'sequelize-typescript';
import config from 'config';

const host: string = config.get('db.host');
const port: number = config.get('db.port');

const sequelize = new Sequelize(config.get('db.name'),
  config.get('db.user'), config.get('db.pass'),
  {host, port, dialect: 'postgres', logging: false,
  models: [__dirname + '/models']});

try {
  sequelize.authenticate();
} catch (e) {
  console.error('Could not communicate with the database.');
  process.exit(1);
}

sequelize.sync({ force: (process.env.YH_RESYNC === 'yes') });

export default sequelize;
