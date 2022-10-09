import * as sinon from 'sinon';
import * as chai from 'chai';
import { expect } from 'chai';
import { StatusCodes } from 'http-status-codes';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import IUserLoginInfo from '../interfaces/IUserLoginInfo';
import User from '../database/models/user.model';

chai.use(chaiHttp);


const dumpUser = {
  username: 'user',
  role: 'role',
};

const dumpUserLoginInfo = {
  email: 'email@email.com',
  password: '1234',
}

describe('/login', () => {
  describe('POST', () => {

    beforeEach(() => {
      sinon.stub(User, 'findOne').resolves({ id: 1, ...dumpUser } as User);
    });

    afterEach(() => {
      (User.findOne as sinon.SinonStub).restore();
    });

    it('return 200 on response status', async () => {
      const response = await chai.request(app).post('/login').send(dumpUserLoginInfo as IUserLoginInfo);
      expect(response.status).to.be.equal(StatusCodes.OK);
    });

    it('return a token on response body', async () => {
      const response = await chai.request(app).post('/login').send(dumpUserLoginInfo as IUserLoginInfo);
      expect(response.body).to.have.property('token');
    });
  });
});
