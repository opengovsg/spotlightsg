import { ConfigService } from '../config/config.service'

const config = new ConfigService()

module.exports = {
  development: {
    dialect: 'postgres',
    host: config.get('db.host'),
    port: config.get('db.port'),
    username: config.get('db.username'),
    password: config.get('db.password'),
    database: config.get('db.database'),
  },
}
