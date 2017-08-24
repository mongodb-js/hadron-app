const { expect } = require('chai');
const ApplicationStore = require('../../../lib/stores');

describe('ApplicationStore', () => {
  describe('#onConnected', () => {
    context('when there is no error', () => {
      let unsubscribe;
      after(() => {
        unsubscribe();
      });

      it('changes the state to connected', (done) => {
        unsubscribe = ApplicationStore.listen((state) => {
          expect(state.isConnected).to.equal(true);
          done();
        });
        ApplicationStore.onConnected(null);
      });
    });

    context('when there is an error', () => {
      let unsubscribe;
      after(() => {
        unsubscribe();
      });

      it('changes the state to not connected', (done) => {
        unsubscribe = ApplicationStore.listen((state) => {
          expect(state.isConnected).to.equal(false);
          done();
        });
        ApplicationStore.onConnected(new Error('error'));
      });
    });
  });
});
