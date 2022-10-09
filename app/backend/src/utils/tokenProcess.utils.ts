import * as Jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';

const jwtSecret = process.env.JWT_SECRET || 'jwt_secret';

export default function tokenProcess(password: string, passwordHash: string, data: object): string | null {
  const validPassword = bcrypt.compareSync(password, passwordHash);

  if (validPassword) {
    const token = Jwt.sign(data, jwtSecret, { expiresIn: '7d' });
    return token;
  }

  return null;
}
