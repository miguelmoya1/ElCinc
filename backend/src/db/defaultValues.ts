import { Client } from '../client/client.model';
import { User } from '../user/user.model';
import * as bcrypt from 'bcryptjs';

export const setDefaultValues = async () => {
  if ((await User.count()) === 0) {
    await User.create({ name: 'Miguel', surname: 'User', password: bcrypt.hashSync('1234'), email: 'miguel@elcinc.com', root: true });
  }

  if ((await Client.count()) === 0) {
    await Client.create({ name: 'Miguel', surname: 'Client', password: bcrypt.hashSync('1234'), email: 'miguelC@elcinc.com' });
  }
};
