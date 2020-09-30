import { User } from '../user/user.model';
import * as bcrypt from 'bcryptjs';

export const setDefaultValues = async () => {
  if ((await User.count()) === 0) {
    await User.create({ name: 'Miguel', password: bcrypt.hashSync('1234'), email: 'miguel@elcinc.com', root: true });
  }
};
