import { expect } from 'chai';
import utils from './utils';
import should from 'should';
import User from '../user';

describe('User model', () => {
  describe('#create', () => {
    it('should have correct properties', (done) => {
      const email = 'snewcomer15@gmail.com';
      const password = 'waterwat';
      const u = {
        email: email,
        password: password
      };
      User.create(u, (err, createdUser) => {
        should.not.exist(err);
        expect(createdUser.email).to.equal(email);
        expect(createdUser.password).to.exist;
        done();
      });
    });
  });
});

