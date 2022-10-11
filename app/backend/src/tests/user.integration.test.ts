import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import IUserLoginInfo from '../interfaces/IUserLoginInfo';
import User from '../database/models/user.model';
import {
  validUserLoginResponse,
  validUserLoginInfo,
  userInfoWithoutEmail,
  userInfoWithoutPassword,
  validToken,
} from '../mocks/user.mocks';

import { StatusCodes } from 'http-status-codes';

chai.use(chaiHttp);

const { expect } = chai;

describe('/login', () => {
  describe('POST', () => {
    describe('When receiving valid info', () => {
      beforeEach(async () => {
        sinon.stub(User, 'findOne').resolves(validUserLoginResponse as User);
      });

      afterEach(async () => {
        (User.findOne as sinon.SinonStub).restore();
      });

      it('returns 200 on response status', async () => {
        const response = await chai
          .request(app)
          .post('/login')
          .send(validUserLoginInfo as IUserLoginInfo);
        expect(response.status).to.be.equal(StatusCodes.OK);
      });

      it('returns a token on response body', async () => {
        const response = await chai
          .request(app)
          .post('/login')
          .send(validUserLoginInfo as IUserLoginInfo);
        expect(response.body).to.have.property('token');
      });
    });
    describe('when receiving info without email', () => {
      it('returns 400 on response status', async () => {
        const response = await chai
          .request(app)
          .post('/login')
          .send(userInfoWithoutEmail);
        expect(response.status).to.be.equal(StatusCodes.BAD_REQUEST);
      });

      it('returns message "All fields must be filled"', async () => {
        const response = await chai
          .request(app)
          .post('/login')
          .send(userInfoWithoutEmail);
        expect(response.body).to.have.property('message');
        expect(response.body.message).to.be.equal('All fields must be filled');
      });
    });
  });
});

describe('/login/validate', () => {
  describe('GET', () => {
    describe('when receiving valid info', () => {
      beforeEach(async () => {
        sinon.stub(User, 'findOne').resolves(validUserLoginResponse as User);
      });

      afterEach(async () => {
        (User.findOne as sinon.SinonStub).restore();
      });

      it('returns 200 on response status', async () => {
        const response = await chai
          .request(app)
          .get('/login/validate')
          .set('authorization', validToken)
          .send(userInfoWithoutPassword);
        expect(response.status).to.be.equal(StatusCodes.OK);
      });

      it('returns user\'s role', async () => {
        const response = await chai
          .request(app)
          .get('/login/validate')
          .set('authorization', validToken)
          .send(userInfoWithoutPassword);
          expect(response.body).to.have.property('role');
      })
    });
  });
});
