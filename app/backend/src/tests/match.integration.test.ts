import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Match from '../database/models/match.model';
import { simpleMatch, validMatchArray } from '../mocks/match.mocks';

import { StatusCodes } from 'http-status-codes';

chai.use(chaiHttp);

const { expect } = chai;

describe('/matches', () => {
  describe('GET', () => {
    beforeEach(async () => {
      sinon.stub(Match, 'findAll').resolves(validMatchArray as Match[]);
    });

    afterEach(async () => {
      (Match.findAll as sinon.SinonStub).restore();
    });

    it('returns 200 on response status', async () => {
      const response = await chai
        .request(app)
        .get('/matches');
      expect(response.status).to.be.equal(StatusCodes.OK);
    });

    it('returns a match array on response', async () => {
      const response = await chai
        .request(app)
        .get('/matches');
      expect(response.body).to.be.an('array');
      expect(response.body).to.be.deep.equal(validMatchArray);
    });
  });
});

describe('/matches/:id/finish', () => {
  describe('PATCH', () => {
    describe('when receiving existing match id', () => {
      beforeEach(async () => {
        sinon.stub(Match, 'findByPk').resolves(simpleMatch as Match);
        sinon.stub(Match, 'update').resolves();
      });
  
      afterEach(async () => {
        (Match.findByPk as sinon.SinonStub).restore();
        (Match.update as sinon.SinonStub).restore();
      });

      it('returns 200 on response status', async () => {
        const response = await chai
          .request(app)
          .patch('/matches/1/finish');
        expect(response.status).to.be.equal(StatusCodes.OK);
      });

      it('returns message "Finished"', async () => {
        const response = await chai
        .request(app)
        .patch('/matches/1/finish');
        expect(response.body).to.have.property('message');
        expect(response.body.message).to.be.equal('Finished');
      });
    });
  });
});

describe('/matches/:id', () => {
  describe('PATCH', () => {
    describe('when receiving existing match id', () => {
      beforeEach(async () => {
        sinon.stub(Match, 'findByPk').resolves(simpleMatch as Match);
      });
  
      afterEach(async () => {
        (Match.findByPk as sinon.SinonStub).restore();
      });

      it('returns 200 on response status', async () => {
        const response = await chai
          .request(app)
          .patch('/matches/1');
        expect(response.status).to.be.equal(StatusCodes.OK);
      });

      it('returns message "Match updated"', async () => {
        const response = await chai
        .request(app)
        .patch('/matches/1');
        expect(response.body).to.have.property('message');
        expect(response.body.message).to.be.equal('Match updated');
      });
    });
  });
});