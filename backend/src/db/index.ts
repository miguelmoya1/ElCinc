import { QueryInterface, Sequelize, SyncOptions } from 'sequelize';
import { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_DIALECT, PROD } from '../app.constants';
import { Colors } from '../shared/colors';
import { highliteSQL } from '../shared/sequelize-color';
import * as path from 'path';
import * as fs from 'fs';

interface IMigrationType {
  up: (queryInterface: QueryInterface, sequelize: Sequelize) => Promise<void>;
  down: (queryInterface: QueryInterface, sequelize: Sequelize) => Promise<void>;
};

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
    await this.runMigrations();
    await this.setAssociations();
    await this.sequelize.sync(this.options);
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
        logging: !PROD ? text => console.log(highliteSQL(text)) : undefined,
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

  private async runMigrations() {
    console.log(Colors.FgBlue, 'RUNNING MIGRATIONS...', Colors.Reset);
    const queryInterface = this.sequelize.getQueryInterface();

    const files = fs.readdirSync(path.join(__dirname, './migrations/'));

    let meta: [{ name: string; }[], any] = [[], undefined];

    try {
      this.sequelize.query('CREATE TABLE IF NOT EXISTS "SequelizeMeta" ("name" VARCHAR);');
      meta = await this.sequelize.query('SELECT "name" FROM "SequelizeMeta"') as any;
    } catch {
      console.log(Colors.FgRed, 'NO SE HA PODIDO CREAR LA TABLA DE MIGRACIONES', Colors.Reset);
    }

    for await (const file of files) {
      if (file && meta[0].findIndex(m => m.name === file) === -1) {
        try {
          const migration: IMigrationType = require(path.join(__dirname, './migrations/', file));
          try {
            await migration.up(queryInterface, this.sequelize);
            await this.sequelize.query({ query: 'INSERT INTO "SequelizeMeta" VALUES (?)', values: [file] });
          } catch (e) {
            await migration.down(queryInterface, this.sequelize);
          }
        } catch {
          console.log('NO SE HA PODIDO LANZAR LA MIGRACIÓN: ', file);
        }
      } else {
        console.log(`${Colors.FgYellow}${file} ${Colors.FgRed}YA HA SIDO AÑADIDO PREVIAMENTE${Colors.Reset}`);
      }
    }
  }
}

const db = new DB();
export { db };
