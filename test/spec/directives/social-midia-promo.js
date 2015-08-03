'use strict';

describe('Directive: socialMidiaPromo', function () {

  // load the directive's module
  beforeEach(module('foodtrackwebApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<social-midia-promo></social-midia-promo>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the socialMidiaPromo directive');
  }));
});
