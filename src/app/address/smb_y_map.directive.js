/*global angular ymaps $ alert*/
;(function () {
  'use strict'
  angular
    .module('smb')
    .directive('smbYMap', smbYMap)
  /* @ngInject */
  function smbYMap () {
    // Usage:
    //
    // Creates:
    //
    var smbYMap = {
      bindToController: true,
      controller: Controller,
      controllerAs: 'ym',
      link: link,
      restrict: 'A',
      scope: {
        coords: '=coords'
      }
    }
    return smbYMap
    function link (scope, element, attrs) {
      ymaps.ready(init)

      function init () {
        var y_map
        // Определяем адрес по координатам (обратное геокодирование)
        function getAddress (coords) {
          ymaps.geocode(coords).then(function (res) {
            var address = res.geoObjects.get(0).properties.get('text')

            // baloon template
            var content = '<p><strong>Вы выбрали адрес:</strong></p>' +
              '<p>' + address + '</p>' +
              '<button id = "address-confirm" class = "btn btn-default">Подтвердить адрес</button>'

            y_map.balloon.open(coords, content, {}).then(function () {
              $('#address-confirm').bind('click', function () {
                alert(address)
              })
            })
          })
        }

        // watch dadata object coords
        scope.$watch('ym.coords', function (newValue, oldValue) {
          if (newValue.length > 0) {
            y_map.setCenter(newValue, 15, {
              checkZoomRange: true
            })
          }
        })

        ymaps.geolocation.get().then(function (res) {
          // fetches users current location, spawns a map and sets center
          var bounds = res.geoObjects.get(0).properties.get('boundedBy')
          var map_state = ymaps.util.bounds.getCenterAndZoom(
            bounds,
            [element.width(), element.height()]
          )
          y_map = new ymaps.Map(attrs.id, map_state)

          // remove extra buttons
          y_map.controls.remove('searchControl')
          y_map.controls.remove('trafficControl')
          y_map.controls.remove('fullscreenControl')

          //  on each click creates/moves a baloon
          //  unbind click event every time and bind again to prevent possible bugs
          y_map.events.add('click', function (e) {
            var coords = e.get('coords')
            $('#address-confirm').unbind('click')
            getAddress(coords)
          })
        }, function (e) {
          var template = '<p><strong>Упс</strong><p>' +
            '<p>Что-то пошло не так :(</p>' +
            '<p>Яндекс.карта не смогла инициализироваться! Пожалуйста, воспользуйтесь ручным вводом</p>'
          element.append(template)
          console.log(e)
        })
      }
    }
  }
  /* @ngInject */
  function Controller () {
  }
})()
