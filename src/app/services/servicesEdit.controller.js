/**
 * Created by edgar on 09/03/17.
 */
(function() {
  'use strict';

  angular
    .module('maraveca')
    .controller('ServiceEditController', ServiceEditController);

  /** @ngInject */
  function ServiceEditController($http, SERVER, $scope, $uibModalInstance, $log, service, $filter) {
    var vm = this;
    var token = localStorage.getItem("satellizer_token");

    $scope.services = service;
    $scope.services.monthly_cuote = parseInt(service.monthly_cuote);
    $scope.services.install_price = parseInt(service.install_price);
    $scope.services.credit_days = parseInt(service.credit_days);

    console.log(service);

    $scope.services.invoice_date = new Date($filter('date')($scope.services.invoice_date, 'dd/MM/yyyy'));
    $scope.services.install_date = new Date($filter('date')($scope.services.install_date, 'dd/MM/yyyy'));
    $scope.services.start_date = new Date($filter('date')($scope.services.start_date, 'dd/MM/yyyy'));

    $scope.ok = function () {
      $(".fakeloader").show();
      $http({
        method: 'PUT',
        url: SERVER + '/service/' + service.id + '/',
        data: $scope.services,
        headers: {
          'Authorization': 'Token ' + token
        }
      }).then(function successCallback(response) {
        $uibModalInstance.close();

        // this callback will be called asynchronously
        // when the response is available
      }, function errorCallback(response) {
        $(".fakeloader").fadeOut();
        // called asynchronously if an error occurs
        // or server returns response with an error status.
      });
    };

    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };


    vm.plan = function () {
      $http({
        method: 'GET',
        url: SERVER + '/plan/',
        headers: {
          'Authorization': 'Token ' + token
        }
      }).then(function successCallback(response) {
        $scope.plans = response.data;
        $(".fakeloader").fadeOut();
        // this callback will be called asynchronously
        // when the response is available
      }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
      });
    };

    vm.plan();


    vm.init = function () {
      $http({
        method: 'GET',
        url: SERVER + '/client/',
        headers: {
          'Authorization': 'Token ' + token
        }
      }).then(function successCallback(response) {
        $scope.users = response.data;
        $(".fakeloader").fadeOut();
        // this callback will be called asynchronously
        // when the response is available
      }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
      });
    };

    vm.init();


  }
})();
