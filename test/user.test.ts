import {expect} from 'chai';
import app from '../src/app';
import {agent as request} from 'supertest';
import {User} from '../src/models/User';

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

});
