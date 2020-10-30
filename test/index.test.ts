import {expect} from 'chai';
import app from '../src/app';
import {agent as request} from 'supertest';

describe('Index Init Test', () => {

  it('should always pass', () => {
    expect(true).to.equal(true);
  });

  it('should GET /', async () => {
    const res = await request(app).get('/');
    expect(res.status).to.equal(200);
    expect(res.body).to.not.be.empty;
    expect(res.body).to.be.an('object');
    expect(res.body.status).to.be.equal('fail');
    expect(res.body.humanReadable).to.be.equal('No route given.');
  });

});
