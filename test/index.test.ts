import sequelize from '../src/database';

describe('Index Init Test', () => {

  it('should synchronize the database', done => {
    sequelize.sync({ force: false }).then(() => done());
  });

});
