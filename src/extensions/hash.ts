import * as bcrypt from 'bcryptjs';

const saltOrRound = 10;
const salt = async () => await bcrypt.genSalt(saltOrRound);
export const hash = async (password) =>
  await bcrypt.hashSync(password, await salt());
