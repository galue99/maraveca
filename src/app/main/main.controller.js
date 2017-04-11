(function() {
  'use strict';

  angular
    .module('maraveca')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($http, SERVER, $scope) {
    var vm = this;

    var token = localStorage.getItem("satellizer_token");
    $(".fakeloader").show();
    $http({
      method: 'GET',
      url: SERVER + '/potential/',
      headers: {
        'Authorization': 'Token ' + token
      }
    }).then(function successCallback(response) {
        $scope.users = response.data;
        $scope.clients_potentials = response.data;
      $(".fakeloader").fadeOut();
      // this callback will be called asynchronously
      // when the response is available
    }, function errorCallback(response) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
    });


    $http({
      method: 'GET',
      url: SERVER + '/client/',
      headers: {
        'Authorization': 'Token ' + token
      }
    }).then(function successCallback(response) {
      $scope.clients = response.data;
      // this callback will be called asynchronously
      // when the response is available
    }, function errorCallback(response) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
    });


  }
})();
