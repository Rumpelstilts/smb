/*global angular $*/
;(function () {
  'use strict'
  angular
    .module('smb')
    .directive('smbAutocomplete', smbAutocomplete)
  /* @ngInject */
  smbAutocomplete.$inject = ['$compile', '$injector']
  function smbAutocomplete ($compile, $injector) {
    // Usage:
    // <div smb-autocomplete type = 'some_type' subject = 'some_subject'></div>
    // Creates:
    // suggestions service from dadata.ru
    var smbAutocomplete = {
      bindToController: true,
      controller: Controller,
      controllerAs: 'ac',
      link: link,
      restrict: 'A',
      scope: {
        subject: '=model'
      }
    }
    return smbAutocomplete
    function link (scope, element, attrs) {
      var suggestion_type = attrs['suggestiontype']
      var suggestion_params = {
        serviceUrl: 'https://dadata.ru/api/v2',
        token: 'ef019a658eb47dedeab2ec55adadffec7f1676c7',
        type: suggestion_type.toUpperCase(),
        count: 5
      }
      switch (suggestion_type) {
        case 'address' :
          suggestion_params['onSelect'] = function (suggestion) {
            scope.ac.subject.address.region = suggestion.data.region_with_type
            scope.ac.subject.address.city = suggestion.data.city_with_type
            scope.ac.subject.address.street = suggestion.data.street_with_type
            scope.ac.subject.address.building = suggestion.data.house
            scope.ac.subject.address.buildingType = suggestion.data.house_type_full
            scope.ac.subject.address.housing = suggestion.data.block
            scope.ac.subject.address.housingType = suggestion.data.block_type
            scope.ac.subject.address.flat = suggestion.data.flat
            scope.ac.subject.address.flatType = suggestion.data.flat_type
            scope.ac.subject.address.zip = suggestion.data.postal_code
            scope.ac.subject.address.fnsName = suggestion.data.tax_office

            scope.ac.subject.address_coords = [parseFloat(suggestion.data.geo_lat), parseFloat(suggestion.data.geo_lon)]
            /*
             geo_lat Координаты: широта
             geo_lon Координаты: долгота
            * */
            // scope.ac.subject.map.setCenter([suggestion.data.geo_lon, suggestion.data.geo_lat])
            console.log(scope.ac.subject)
            scope.$apply()
          }
          break
        default:
          suggestion_params['onSelect'] = function (suggestion) {}
          break
      }
      $(element).suggestions(suggestion_params)
    }
  }
  Controller.$inject = ['address']
  function Controller (address) {
    var vm = this
    activate()

    function activate () {
      if (!vm.subject.address) {
        vm.subject.address = address()
      }
    }
  }
})()
