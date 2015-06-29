'use strict';

describe('Controller: PolltruckersCtrl', function () {

  // load the controller's module
  beforeEach(module('foodtrackwebApp'));

  var PolltruckersCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PolltruckersCtrl = $controller('PolltruckersCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
