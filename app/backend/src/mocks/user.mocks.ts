import * as bcrypt from 'bcryptjs';

export const validUserLoginResponse = {
  username: 'validUsername',
  email: 'validEmail@email.com',
  password: bcrypt.hashSync('validPassword'),
  role: 'validRole'
}

export const validUserLoginInfo = {
  email: 'validEmail@email.com',
  password: 'validPassword'
}

export const userInfoWithoutPassword = {
  email: 'validEmail@email.com'
}

export const userInfoWithoutEmail = {
  password: 'validPassword'
}

export const validToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJAdXNlci5jb20iLCJpYXQiOjE2NjU0OTc0NjMsImV4cCI6MTY2NjEwMjI2M30.E2P9BpxrOypDoM4NhRvvp_jPUgXsIHeAkqIvg6TfWN8';