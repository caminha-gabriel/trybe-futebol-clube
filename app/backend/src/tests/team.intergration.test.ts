import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Team from '../database/models/team.model';
import { validTeamArray } from '../mocks/team.mocks';

import { StatusCodes } from 'http-status-codes';

chai.use(chaiHttp);

const { expect } = chai;

describe('/teams', () => {
  describe('GET', () => {
    beforeEach(async () => {
      sinon.stub(Team, 'findAll').resolves(validTeamArray as Team[]);
    });

    afterEach(async () => {
      (Team.findAll as sinon.SinonStub).restore();
    });

    it('returns 200 on response status', async () => {
      const response = await chai
        .request(app)
        .get('/teams');
      expect(response.status).to.be.equal(StatusCodes.OK);
    });

    it('returns a team array on response', async () => {
      const response = await chai
        .request(app)
        .get('/teams');
      expect(response.body).to.be.an('array');
      expect(response.body).to.be.deep.equal(validTeamArray);
    });
  });
});

describe('/teams/:id', () => {
  describe('GET', () => {
    describe('when receiving existing team id', () => {
      beforeEach(async () => {
        sinon.stub(Team, 'findByPk').resolves(validTeamArray[0] as Team);
      });
  
      afterEach(async () => {
        (Team.findByPk as sinon.SinonStub).restore();
      });

      it('returns 200 on response status', async () => {
        const response = await chai
          .request(app)
          .get('/teams/1');
        expect(response.status).to.be.equal(StatusCodes.OK);
      });

      it('returns correct team on response', async () => {
        const response = await chai
        .request(app)
        .get('/teams/1');
      expect(response.body).to.be.deep.equal(validTeamArray[0]);
      });
    });

    describe('when receiving invalid team id', () => {
      beforeEach(async () => {
        sinon.stub(Team, 'findByPk').resolves(null);
      });

      afterEach(async () => {
        (Team.findByPk as sinon.SinonStub).restore();
      });

      it('returns 404 on response status', async () => {
        const response = await chai
          .request(app)
          .get('/teams/9999');
        expect(response.status).to.be.equal(StatusCodes.NOT_FOUND);
      });

      it('returns message "Content not found"', async () => {
        const response = await chai
          .request(app)
          .get('/teams/9999');
          expect(response.body).to.have.property('message');
          expect(response.body.message).to.be.equal('Content not found');
      });
    });
  })
})