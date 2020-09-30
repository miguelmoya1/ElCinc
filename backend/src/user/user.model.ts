import { Model, DataTypes } from 'sequelize';
import { IUser } from '../../../global';
import { db } from '../db';

export class User extends Model<IUser> implements IUser {
  public id!: string;
  public email!: string;
  public password!: string;
  public name!: string;
  public surname!: string;

  public root!: boolean;
  public isLogged!: Date;

  public location?: { type: string; coordinates: [number, number] };

  public appVersion!: string;
  public appBuild!: string;
  public operatingSystem!: string;
  public osVersion!: string;
  public platform!: string;
  public model!: string;
  public manufacturer!: string;
  public uuid!: string;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: { type: DataTypes.STRING },
    surname: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING, unique: true },
    password: { type: DataTypes.STRING },

    isLogged: { type: DataTypes.DATE },
    root: { type: DataTypes.BOOLEAN, defaultValue: false },

    location: { type: DataTypes.GEOGRAPHY },

    appVersion: { type: DataTypes.STRING },
    appBuild: { type: DataTypes.STRING },
    operatingSystem: { type: DataTypes.STRING },
    osVersion: { type: DataTypes.STRING },
    platform: { type: DataTypes.STRING },
    model: { type: DataTypes.STRING },
    manufacturer: { type: DataTypes.STRING },
    uuid: { type: DataTypes.STRING },
  },
  {
    sequelize: db.sequelize,
    paranoid: true,
    timestamps: true,
  }
);
