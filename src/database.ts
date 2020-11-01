import { Sequelize } from 'sequelize';
import config from 'config';

const db: { user: string,
   pass: string, host: string,
   port: number, name: string } = config.get('db');
console.log(db);

export default new Sequelize(
  `postgres://${db.user}:${db.pass}@${db.host}:${db.port}/${db.name}`);
