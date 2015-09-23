'use strict';

describe('Filter: isPassed', function () {

  // load the filter's module
  beforeEach(module('foodtrackwebApp'));

  // initialize a new instance of the filter before each test
  var isPassed;
  beforeEach(inject(function ($filter) {
    isPassed = $filter('isPassed');
  }));

  it('should return the input prefixed with "isPassed filter:"', function () {
    var text = 'angularjs';
    expect(isPassed(text)).toBe('isPassed filter: ' + text);
  });

});
