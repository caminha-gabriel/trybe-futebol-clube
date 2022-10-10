import * as Jwt from 'jsonwebtoken';

const jwtSecret = process.env.JWT_SECRET || 'jwt_secret';

export default function decodeToken(token: string) {
  const decodedToken = Jwt.verify(token, jwtSecret);
  return decodedToken;
}
