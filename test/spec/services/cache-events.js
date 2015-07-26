'use strict';

describe('Service: cacheEvents', function () {

  // load the service's module
  beforeEach(module('foodtrackwebApp'));

  // instantiate service
  var cacheEvents;
  beforeEach(inject(function (_cacheEvents_) {
    cacheEvents = _cacheEvents_;
  }));

  it('should do something', function () {
    expect(!!cacheEvents).toBe(true);
  });

});
