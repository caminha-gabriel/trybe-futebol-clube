import * as Jwt from 'jsonwebtoken';

const jwtSecret = process.env.JWT_SECRET || 'jwt_secret';

export default function createToken(tag: string, data: string): string {
  const token = Jwt.sign({ [tag]: data }, jwtSecret, { expiresIn: '7d' });
  return token;
}
