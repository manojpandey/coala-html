"use strict";

describe('TableRowLinks Directive', function() {

  var element, scope, location;
  var codeHTML = '<table table-row-links>' +
                 '  <tr class="item1">' +
                 '    <td><a ng-click="item1Clicked = true" ' +
                 '           ng-href="#/item1"></a></td>' +
                 '  </tr>' +
                 '  <tr class="item2">' +
                 '    <td><a></a></td>' +
                 '  </tr>' +
                 '</table>';

  beforeEach(module('coalaHtmlApp'));
  beforeEach(inject(function ($compile, $rootScope, $location) {
    scope = $rootScope.$new();
    location = $location;
    element = $compile(codeHTML)(scope);
  }));

  it('adds link to row', function () {
    scope.$digest();
    expect(angular.element(element[0].querySelector('.item1'))
             .hasClass('table-row-link')).to.be.ok;
    expect(angular.element(element[0].querySelector('.item2'))
             .hasClass('table-row-link')).to.be.ok;
  });

  it('adds link when content changes', function () {
    var oldChildCount = element[0].childNodes.length;
    scope.$digest();
    element.append('<tr class="item3"><td><a href="$/item3"></a></td></tr>');

    expect(element[0].childNodes.length).to.be.equal(oldChildCount + 1);
    scope.$digest();
    expect(angular.element(element[0].querySelector('.item3'))
             .hasClass('table-row-link')).to.be.ok;
  });

  it('clicks anchor when row is clicked', function () {
    scope.$digest();
    var item1 = angular.element(element[0].querySelector('.item1'));
    expect(scope.item1Clicked).to.not.be.ok;
    item1[0].click();
    expect(scope.item1Clicked).to.be.ok;
  });
});
