import { Model, DataTypes } from 'sequelize';
import { IEvent } from '../../../global';
import { db } from '../db';

export class Event extends Model<IEvent> implements IEvent {
  public id!: string;
  public startAt!: Date;
  public endAt!: Date;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}

Event.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    startAt: { type: DataTypes.DATE },
    endAt: { type: DataTypes.DATE },
  },
  {
    sequelize: db.sequelize,
    paranoid: true,
    timestamps: true,
  }
);
