import {expect} from 'chai';
import app from '../src/app';
import {agent as request} from 'supertest';
import sequelize from '../src/database';

describe('Index Init Test', () => {

  beforeEach(done => {
    sequelize.sync({ force: false }).then(() => done());
  });

  it('should GET /', async () => {
    const res = await request(app).get('/');
    expect(res.status).to.equal(200);
    expect(res.body).to.not.be.empty;
    expect(res.body).to.be.an('object');
    expect(res.body.status).to.be.equal('error');
    expect(res.body.reason).to.be.equal('Route not provided.');
  });

});
