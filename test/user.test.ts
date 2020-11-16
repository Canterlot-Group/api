import {expect, use} from 'chai';
import app from '../src/app';
import {agent as request} from 'supertest';
import chaiUuid = require('chai-uuid');
use(chaiUuid);

describe('Users', () => {

  it('should fail to get user information due to no token passed', async () => {
    const res = await request(app).get('/user/61d93aa9-fbe4-4d8b-bf23-419dae1c0029');
    expect(res.status).to.equal(403);
    expect(res.body).to.not.be.empty;
    expect(res.body).to.be.an('object');
    expect(res.body.status).to.be.equal('error');
    expect(res.body.reason).to.be.equal('Unable to view other users without member privileges or higher.');
  });

  it('should not find any user, but pass the authentication process', async () => {
    const res = await request(app).get('/user/61d93aa9-fbe4-4d8b-bf23-419dae1c0029')
      .set('X-User-Token', '0000000000000000');
    expect(res.status).to.equal(404);
    expect(res.body).to.not.be.empty;
    expect(res.body).to.be.an('object');
    expect(res.body.status).to.be.equal('error');
    expect(res.body.reason).to.be.equal('User by this ID does not exist.');
  });

  it('should successfully register a user', async () => {
    const user: object = {name: 'userno1',
      email: 'userno1@example.com', password: '123456789'};
    const res = await request(app).post('/user').send(user).set('X-User-Token', '0000000000000000');
    expect(res.status).to.equal(200);
    expect(res.body).to.not.be.empty;
    expect(res.body).to.be.an('object');
    expect(res.body.status).to.be.equal('ok');
    expect(res.body.message).to.be.equal('Created');
    expect(res.body.userID).to.be.uuid('v4');
  });

});
