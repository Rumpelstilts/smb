/*global angular*/
;(function () {
  'use strict'
  angular
    .module('smb')
    .directive('smbAutocomplete', smbAutocomplete)
  /* @ngInject */
  function smbAutocomplete () {
    // Usage:
    // <div smb-autocomplete type = 'some_type' subject = 'some_subject'></div>
    // Creates:
    // suggestions service from dadata.ru
    var smbAutocomplete = {
      link: link,
      restrict: 'A'
    }
    return smbAutocomplete
    function link (scope, element, attrs) {
      var suggestion_type = attrs['type']
      var suggestion_params = {
        serviceUrl: 'https://dadata.ru/api/v2',
        token: 'ef019a658eb47dedeab2ec55adadffec7f1676c7',
        type: suggestion_type.toUpperCase(),
        count: 5
      }
      switch (suggestion_type) {
        case 'address' :
          var subject = attrs['subject']
          suggestion_params['onSelect'] = function (suggestion) {
            console.log(suggestion)

            subject.address.region = suggestion.data.region_with_type
            subject.address.city = suggestion.data.city_with_type
            subject.address.street = suggestion.data.street_with_type
            subject.address.building = suggestion.data.house
            subject.address.buildingType = suggestion.data.house_type_full
            subject.address.housing = suggestion.data.block
            subject.address.housingType = suggestion.data.block_type
            subject.address.flat = suggestion.data.flat
            subject.address.flatType = suggestion.data.flat_type
            subject.address.zip = suggestion.data.postal_code
            subject.address.fnsName = suggestion.data.tax_office

            subject.address_coords = [parseFloat(suggestion.data.geo_lat), parseFloat(suggestion.data.geo_lon)]
          /*
           geo_lat Координаты: широта
           geo_lon Координаты: долгота
          * */
          // subject.map.setCenter([suggestion.data.geo_lon, suggestion.data.geo_lat])
          }
          break
        default:
          return
      }
      element.suggestions(suggestion_params)
    }
  }
})()
