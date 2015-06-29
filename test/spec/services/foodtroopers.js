'use strict';

describe('Service: Foodtroopers', function () {

  // load the service's module
  beforeEach(module('foodtrackwebApp'));

  // instantiate service
  var Foodtroopers;
  beforeEach(inject(function (_Foodtroopers_) {
    Foodtroopers = _Foodtroopers_;
  }));

  it('should do something', function () {
    expect(!!Foodtroopers).toBe(true);
  });

});
