import { Client } from '../client/client.model';
import { Event } from '../event/event.model';

export const setAssociations = () => {
  Client.hasMany(Event, { foreignKey: 'clientID' });
  Event.belongsTo(Client, { foreignKey: 'clientID' });
};
