import * as Jwt from 'jsonwebtoken';

const jwtSecret = process.env.JWT_SECRET || 'jwt_secret';

export default function tokenProcess(data: object): string {
  const token = Jwt.sign({ data }, jwtSecret, { expiresIn: '7d' });
  return token;
}
