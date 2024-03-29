/*global angular*/
;(function () {
  'use strict'
  angular
    .module('smb')
    .config(config)

  function config ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('landing')
    $stateProvider
      .state('landing', {
        url: '/landing',
        templateUrl: 'app/static/landing.html'
      })
      .state('login', {
        url: '/login',
        templateUrl: 'app/user/login/login_page.html'
      })
      .state('register_ie', {
        url: '/registration/ie',
        templateUrl: 'app/register/ie/ie.html'
      })
      .state('register_ie.address', {
        templateUrl: 'app/address/address.html'
      })
      .state('register_llc', {
        url: '/registration/llc',
        templateUrl: 'app/register/llc_start/llc_start.html',
        controller: 'llc_ctart_controller',
        controllerAs: 'vm'
      })
      .state('register_llc_simple', {
        url: '/registration/llc/simple',
        templateUrl: 'app/register/llc_simple/llc_simple.html',
        controller: 'llc_simple_controller',
        controllerAs: 'llc'
      })

      // $stateProvider
      // .state('registration', {
      //   url: '/registration',
      //   templateUrl: 'templates/pages/registration.html',
      //   controller: 'user_registration_ctrl'
      // })
      // .state('landing', {
      //   url: '/landing',
      //   templateUrl: 'templates/pages/landing.html'
      // })
      // .state('registration_ip', {
      //   url: '/registration/ip',
      //   templateUrl: 'templates/registration/ip.html'
      // })
      // .state('login', {
      //   url: '/login',
      //   templateUrl: 'templates/pages/login.html',
      //   controller: 'user_login_ctrl'
      // })
      // .state('ltd_type_choice', {
      //   url: '/ltd',
      //   templateUrl: 'templates/pages/ltd_type.html',
      //   controller: 'ltd_type_choice_ctrl'
      // })
      // .state('restore_password', {
      //   url: '/restore/password',
      //   templateUrl: 'templates/pages/restore_password.html',
      //   controller: 'user_restore_password_controller'
      // })
      // .state('registration_ip.choose_address_new', {
      //   templateUrl: 'templates/steps/ip/choose_address_new.html'
      // })
      // .state('registration_ip.choose_address_buy', {
      //   templateUrl: 'templates/steps/ip/choose_address_buy.html'
      // })

      // .state('registration_ltd_simple', {
      //   url: '/registration/ltd/simple',
      //   templateUrl: 'templates/registration/ltd_simple.html'
      // })

  // .state('registration_complex', {
  //   templateUrl: 'templates/steps/ip/choose_address_buy.html'
  // })
  }
})()
