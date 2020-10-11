import { Sequelize, SyncOptions } from 'sequelize';
import { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_DIALECT, PROD } from '../app.constants';
import { Colors } from '../shared/colors';
import { highliteSQL } from '../shared/sequelize-color';
import { runMigrations } from 'sequelize-do-migrations';

class DB {
  public sequelize!: Sequelize;
  public readonly options: SyncOptions = {
    force: false,
  };

  constructor() {
    this.setSequelize();
  }

  public async init() {
    await this.createExtensions();
    await this.setAssociations();
    await this.sequelize.sync(this.options);
    await runMigrations(this.sequelize, { showLogs: true });
    await this.createDefaultValues();
  }

  private async createDefaultValues() {
    if (!PROD) {
      const setDefaultValues = require('./defaultValues').setDefaultValues;
      await setDefaultValues();
    } else {
      console.log(Colors.FgRed, 'PROD MODE: NO DEFAULT VALUE', Colors.Reset);
    }
  }

  private async setAssociations() {
    console.log(Colors.FgBlue, 'SETTING THE ASSOCIATIONS...', Colors.Reset);
    const setAssociations = require('./associations').setAssociations;
    await setAssociations();
  }

  private setSequelize() {
    console.log(Colors.FgBlue, 'INITIALIZING DATABASE...', Colors.Reset);

    try {
      this.sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
        host: DB_HOST,
        dialect: DB_DIALECT,
        logging: !PROD ? (text) => console.log(highliteSQL(text)) : undefined,
        pool: {
          max: 20,
          min: 1,
          acquire: 30000,
          idle: 10000,
        },
      });
    } catch (e) {
      console.log(e);
    }
  }

  private async createExtensions() {
    await this.sequelize.query('CREATE EXTENSION IF NOT EXISTS postgis;');
  }
}

const db = new DB();
export { db };
